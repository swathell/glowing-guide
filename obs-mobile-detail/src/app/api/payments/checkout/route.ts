import { checkoutSchema } from "@/lib/booking/validation";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { hasEnvVars, missingEnvVars } from "@/lib/env-guard";

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
        "id, public_reference, estimated_total_cents, deposit_required_cents, status, customers(first_name, email)"
      )
      .eq("id", payload.bookingId)
      .single();

    if (error || !booking) {
      return jsonError("Booking not found", { status: 404, code: "BOOKING_NOT_FOUND" });
    }

    const rawCustomers = booking.customers as unknown;
    const customerEmail =
      Array.isArray(rawCustomers)
        ? (rawCustomers[0] as { email?: string } | undefined)?.email
        : (rawCustomers as { email?: string } | null | undefined)?.email;

    const depositAmount = booking.deposit_required_cents;
    if (!depositAmount) {
      return jsonError("This booking does not require a deposit", {
        status: 400,
        code: "NO_DEPOSIT_REQUIRED"
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

    await supabase.from("payments").insert({
      booking_id: booking.id,
      provider: "stripe",
      payment_type: "deposit",
      status: "pending",
      amount_cents: depositAmount,
      currency: "cad",
      stripe_checkout_session_id: session.id
    });

    return jsonSuccess({ url: session.url });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to create checkout session", {
      status: 400,
      code: "CHECKOUT_CREATE_FAILED"
    });
  }
}
