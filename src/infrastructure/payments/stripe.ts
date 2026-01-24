import { StripePaymentProvider } from "../../adapters/outbound/payments/StripePaymentProvider";
import { requireEnv } from "../config/env";

export function createStripePaymentProvider() {
  const stripeSk = requireEnv("STRIPE_SECRET_KEY");
  return new StripePaymentProvider(stripeSk);
}
