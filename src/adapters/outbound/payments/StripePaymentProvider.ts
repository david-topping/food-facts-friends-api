import Stripe from "stripe";
import { PaymentProvider } from "../../../domain/ports/PaymentProvider";

export class StripePaymentProvider implements PaymentProvider {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey);
  }

  async createPaymentIntent(
    amountPence: number,
    metadata: Record<string, string>
  ) {
    const intent = await this.stripe.paymentIntents.create({
      amount: amountPence,
      currency: "gbp",
      metadata,
    });

    return {
      id: intent.id,
      clientSecret: intent.client_secret!,
    };
  }
}
