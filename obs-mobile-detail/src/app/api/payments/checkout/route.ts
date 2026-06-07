import { checkoutSchema } from "@/lib/booking/validation";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { hasEnvVars, missingEnvVars } from "@/lib/env-guard";

function getCustomerEmail(customers: unknown) {
  if (Array.isArray(customers)) {
    const firstCustomer = customers[0] as { email?: string } | undefined;
    return firstCustomer?.email;
  }

  const customer = customers as { email?: string } | null | undefined;
  return customer?.email;
}

export async function POST(request: Request) {
  try {
    if (!hasEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "STRIPE_SECRET_KEY"])) {
      return jsonError("Deposit checkout is temporarily unavailable. Please try again shortly.", {
        status: 503,
        code: "CHECKOUT_UNAVAILABLE",
        details: {
          missing: missingEnvVars([
            "NEXT_PUBLIC_SUPABASE_URL",
            "SUPABASE_SERVICE_ROLE_KEY",
            "STRIPE_SECRET_KEY"
          ])
        }
      });
    }

    const json = await request.json();
    const payload = await checkoutSchema.parseAsync(json);
    const supabase = getSupabaseAdminClient();

    const { data: booking, error } = await supabase
      .from("bookings")
      .select(
        "id, public_reference, estimated_total_cents, deposit_required_cents, status, booking_mode_final, customers(first_name, email)"
      )
      .eq("id", payload.bookingId)
      .single();

    if (error || !booking) {
      return jsonError("Booking not found", { status: 404, code: "BOOKING_NOT_FOUND" });
    }

    const customerEmail = getCustomerEmail(booking.customers);

    const depositAmount = booking.deposit_required_cents;
    if (!depositAmount) {
      return jsonError("This booking does not require a deposit", {
        status: 400,
        code: "NO_DEPOSIT_REQUIRED"
      });
    }

    if (booking.booking_mode_final !== "deposit_required") {
      return jsonError("This booking is not eligible for deposit checkout", {
        status: 400,
        code: "INVALID_BOOKING_MODE"
      });
    }

    if (!["awaiting_deposit", "quoted"].includes(booking.status)) {
      return jsonError("This booking is not ready for deposit checkout", {
        status: 400,
        code: "INVALID_BOOKING_STATUS"
      });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${env.siteUrl}/book/success?booking=${booking.id}`,
      cancel_url: `${env.siteUrl}/book/cancelled?booking=${booking.id}`,
      customer_email: customerEmail || undefined,
      metadata: {
        bookingId: booking.id,
        bookingReference: booking.public_reference
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "cad",
            unit_amount: depositAmount,
            product_data: {
              name: `OBS deposit for ${booking.public_reference}`
            }
          }
        }
      ]
    });

    await supabase
      .from("payments")
      .update({ status: "cancelled" })
      .eq("booking_id", booking.id)
      .eq("payment_type", "deposit")
      .eq("status", "pending");

    const { error: paymentError } = await supabase.from("payments").insert({
      booking_id: booking.id,
      provider: "stripe",
      payment_type: "deposit",
      status: "pending",
      amount_cents: depositAmount,
      currency: "cad",
      stripe_checkout_session_id: session.id
    });

    if (paymentError) {
      return jsonError(paymentError.message, {
        status: 400,
        code: "PAYMENT_RECORD_CREATE_FAILED"
      });
    }

    await supabase.from("booking_events").insert({
      booking_id: booking.id,
      event_type: "deposit_requested",
      actor_type: "system",
      payload_json: {
        stripeSessionId: session.id,
        depositAmount
      }
    });

    return jsonSuccess({ url: session.url });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to create checkout session", {
      status: 400,
      code: "CHECKOUT_CREATE_FAILED"
    });
  }
}
