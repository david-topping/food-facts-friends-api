export type CreateDonationRecord = {
  stripePaymentIntentId: string;
  amountPence: number;
  currency: string;
  email: string;
  status: "pending" | "succeeded" | "failed";
  giftAid: boolean;
  giftAidDetails?: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postcode: string;
    country: string;
  };
};

export interface DonationRepository {
  save(input: CreateDonationRecord): Promise<void>;
  markSucceededByPaymentIntentId(paymentIntentId: string): Promise<void>;
  markFailedByPaymentIntentId(paymentIntentId: string): Promise<void>;
}
