import { RetrievedPaymentIntent } from "../entities/DonationIntent";

export interface CreateDonationIntentInput {
  amountPence: number;
  currency: string;
  receiptEmail: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResult {
  id: string;
  clientSecret: string;
}

export interface PaymentProvider {
  createPaymentIntent(
    input: CreateDonationIntentInput,
  ): Promise<PaymentIntentResult>;
  getPaymentIntent(
    paymentIntentId: string,
  ): Promise<RetrievedPaymentIntent | null>;
}
