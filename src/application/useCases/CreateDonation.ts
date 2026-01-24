import { PaymentProvider } from "../../domain/ports/PaymentProvider";
import { DonationRepository } from "../../domain/ports/DonationRepository";
import { Donation } from "../../domain/entities/Donation";

export class CreateDonation {
  constructor(
    private readonly paymentProvider: PaymentProvider,
    private readonly donationRepository: DonationRepository,
  ) {}

  async execute(input: {
    amountPence: number;
    email: string;
    giftAid: boolean;
    giftAidDetails?: {
      firstName: string;
      lastName: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postcode: string;
      country?: string;
    };
  }) {
    const donation = new Donation(
      crypto.randomUUID(),
      input.amountPence,
      input.email,
      input.giftAid,
    );

    const paymentIntent = await this.paymentProvider.createPaymentIntent({
      amountPence: donation.amountPence,
      currency: "gbp",
      receiptEmail: donation.email,
      metadata: {
        donationId: donation.id,
        giftAid: String(donation.giftAid),
      },
    });

    await this.donationRepository.save({
      stripePaymentIntentId: paymentIntent.id,
      amountPence: donation.amountPence,
      currency: "gbp",
      email: donation.email,
      status: "pending",
      giftAid: donation.giftAid,
      giftAidDetails: donation.giftAid
        ? {
            firstName: input.giftAidDetails!.firstName,
            lastName: input.giftAidDetails!.lastName,
            addressLine1: input.giftAidDetails!.addressLine1,
            addressLine2: input.giftAidDetails!.addressLine2,
            city: input.giftAidDetails!.city,
            postcode: input.giftAidDetails!.postcode,
            country: input.giftAidDetails!.country ?? "United Kingdom",
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
