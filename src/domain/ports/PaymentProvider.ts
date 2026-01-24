export interface PaymentIntent {
  id: string;
  clientSecret: string;
}

export interface CreatePaymentIntentInput {
  amountPence: number;
  currency: string;
  receiptEmail: string;
  metadata?: Record<string, string>;
}

export interface PaymentProvider {
  createPaymentIntent(input: CreatePaymentIntentInput): Promise<PaymentIntent>;
}
