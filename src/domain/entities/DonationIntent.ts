import crypto from "crypto";

export class DonationIntent {
  public readonly id: string;

  constructor(
    public readonly amountPence: number,
    public readonly email: string,
  ) {
    this.id = crypto.randomUUID();
  }
}

export interface RetrievedPaymentIntent {
  id: string;
  amount: number;
  status: string;
}
