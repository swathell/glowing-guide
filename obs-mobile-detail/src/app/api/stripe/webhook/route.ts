import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { sendDepositConfirmedEmail } from "@/lib/booking/email";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { hasEnvVars, missingEnvVars } from "@/lib/env-guard";
import { persistAnalyticsEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  if (!hasEnvVars(["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"])) {
    return jsonError("Stripe webhook is not configured.", {
      status: 503,
      code: "STRIPE_WEBHOOK_UNAVAILABLE",
      details: {
        missing: missingEnvVars(["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"])
      }
    });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return jsonError("Missing stripe signature", { status: 400, code: "MISSING_STRIPE_SIGNATURE" });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, env.stripeWebhookSecret);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Webhook verification failed", {
      status: 400,
      code: "WEBHOOK_VERIFICATION_FAILED"
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const supabase = getSupabaseAdminClient();
      const paymentIntentId =
        typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;

      await supabase
        .from("payments")
        .update({
          status: "paid",
          stripe_payment_intent_id: paymentIntentId || null,
          receipt_url: session.url || null
        })
        .eq("stripe_checkout_session_id", session.id);

      const { data: booking } = await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          deposit_paid_cents: session.amount_total || 0
        })
        .eq("id", bookingId)
        .select("public_reference, customer_id")
        .single();

      await supabase.from("booking_events").insert({
        booking_id: bookingId,
        event_type: "deposit_paid",
        actor_type: "system",
        payload_json: {
          stripeSessionId: session.id
        }
      });

      if (booking) {
        const { data: customer } = await supabase
          .from("customers")
          .select("first_name, email")
          .eq("id", booking.customer_id)
          .single();

        if (customer?.email) {
          await sendDepositConfirmedEmail({
            email: customer.email,
            firstName: customer.first_name,
            bookingReference: booking.public_reference
          });
        }
      }

      await persistAnalyticsEvent({
        eventName: "deposit_paid",
        pagePath: "/api/stripe/webhook",
        metadata: {
          bookingId,
          stripeSessionId: session.id
        }
      });
    }
  }

  return jsonSuccess({ received: true });
}
