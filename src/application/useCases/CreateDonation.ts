import { PaymentProvider } from "../../domain/ports/PaymentProvider";
import { DonationRepository } from "../../domain/ports/DonationRepository";
import { DonationIntent } from "../../domain/entities/DonationIntent";

export type GiftAidDetails = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country?: string;
};

export type CreateDonationInput = {
  amountPence: number;
  email: string;
} & ({ giftAid: false } | { giftAid: true; giftAidDetails: GiftAidDetails });

export class CreateDonation {
  constructor(
    private readonly paymentProvider: PaymentProvider,
    private readonly donationRepository: DonationRepository,
  ) {}

  async execute(input: CreateDonationInput) {
    const donation = new DonationIntent(input.amountPence, input.email);

    const paymentIntent = await this.paymentProvider.createPaymentIntent({
      amountPence: donation.amountPence,
      currency: "gbp",
      receiptEmail: donation.email,
      metadata: {
        donationId: donation.id,
        giftAid: String(input.giftAid),
      },
    });

    await this.donationRepository.save({
      paymentIntentId: paymentIntent.id,
      amountPence: donation.amountPence,
      currency: "gbp",
      email: donation.email,
      status: "pending",
      giftAid: input.giftAid,
      giftAidDetails: input.giftAid
        ? {
            firstName: input.giftAidDetails.firstName,
            lastName: input.giftAidDetails.lastName,
            addressLine1: input.giftAidDetails.addressLine1,
            addressLine2: input.giftAidDetails.addressLine2,
            city: input.giftAidDetails.city,
            postcode: input.giftAidDetails.postcode,
            country: input.giftAidDetails.country ?? "United Kingdom",
          }
        : undefined,
    });

    return {
      donationId: donation.id,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.clientSecret,
    };
  }
}
