import Stripe from "stripe";
import {
  PaymentProvider,
  CreatePaymentIntentInput,
  PaymentIntent,
} from "../../../domain/ports/PaymentProvider";

export class StripePaymentProvider implements PaymentProvider {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey);
  }

  async createPaymentIntent(
    input: CreatePaymentIntentInput,
  ): Promise<PaymentIntent> {
    const intent = await this.stripe.paymentIntents.create({
      amount: input.amountPence,
      currency: input.currency,
      receipt_email: input.receiptEmail,
      metadata: input.metadata,
      automatic_payment_methods: { enabled: true },
    });

    if (!intent.client_secret) {
      throw new Error("Stripe did not return client_secret");
    }

    return {
      id: intent.id,
      clientSecret: intent.client_secret,
    };
  }
}
