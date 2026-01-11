import { PaymentProvider } from "../../domain/ports/PaymentProvider";
// import { DonationRepository } from "../../domain/ports/DonationRepository";
import { Donation } from "../../domain/entities/Donation";

export class CreateDonation {
  constructor(
    private payments: PaymentProvider
  ) // private donations: DonationRepository
  {}

  async execute(input: {
    amountPence: number;
    email: string;
    giftAid: boolean;
  }) {
    const donation = new Donation(
      crypto.randomUUID(),
      input.amountPence,
      input.email,
      input.giftAid
    );

    const paymentIntent = await this.payments.createPaymentIntent(
      donation.amountPence,
      {
        donationId: donation.id,
        giftAid: String(donation.giftAid),
      }
    );

    // await this.donations.save(donation);

    return {
      clientSecret: paymentIntent.clientSecret,
    };
  }
}
