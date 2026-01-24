import Stripe from "stripe";
import {
  PaymentProvider,
  CreateDonationIntentInput,
  PaymentIntentResult,
} from "../../../domain/ports/PaymentProvider";
import { RetrievedPaymentIntent } from "../../../domain/entities/DonationIntent";

export class StripePaymentProvider implements PaymentProvider {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey);
  }

  async createPaymentIntent(
    input: CreateDonationIntentInput,
  ): Promise<PaymentIntentResult> {
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

  async getPaymentIntent(
    paymentIntentId: string,
  ): Promise<RetrievedPaymentIntent | null> {
    try {
      const intent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        id: intent.id,
        amount: intent.amount,
        status: intent.status,
      };
    } catch (error) {
      return null;
    }
  }
}
