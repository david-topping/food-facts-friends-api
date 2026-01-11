export interface PaymentIntent {
  id: string;
  clientSecret: string;
}

export interface PaymentProvider {
  createPaymentIntent(
    amountPence: number,
    metadata: Record<string, string>
  ): Promise<PaymentIntent>;
}
