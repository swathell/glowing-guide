import Stripe from "stripe";
import { env } from "@/lib/env";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(env.stripeSecretKey, {
      apiVersion: "2025-08-27.basil"
    });
  }

  return stripeClient;
}
