export type DonationRecord = {
  paymentIntentId: string;
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
