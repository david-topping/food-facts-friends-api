import { Sequelize } from "sequelize";
import {
  DonationRepository,
  CreateDonationRecord,
} from "../../../../domain/ports/DonationRepository";
import { initModels } from "./models/initModels";
import { DonationModel } from "./models/Donation.model";
import { GiftAidDetailsModel } from "./models/GiftAidDetials.model";

export class SequelizeDonationRepository implements DonationRepository {
  private Donation: typeof DonationModel;
  private GiftAidDetails: typeof GiftAidDetailsModel;

  constructor(private readonly sequelize: Sequelize) {
    const models = initModels(this.sequelize);
    this.Donation = models.DonationModel;
    this.GiftAidDetails = models.GiftAidDetailsModel;
  }

  async save(input: CreateDonationRecord): Promise<void> {
    await this.sequelize.transaction(async (t) => {
      const donation = await this.Donation.create(
        {
          stripe_payment_intent_id: input.stripePaymentIntentId,
          amount_pence: input.amountPence,
          currency: input.currency,
          email: input.email,
          status: input.status,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { transaction: t },
      );

      if (input.giftAid && input.giftAidDetails) {
        await this.GiftAidDetails.create(
          {
            donation_id: donation.id,
            first_name: input.giftAidDetails.firstName,
            last_name: input.giftAidDetails.lastName,
            address_line1: input.giftAidDetails.addressLine1,
            address_line2: input.giftAidDetails.addressLine2 ?? null,
            city: input.giftAidDetails.city,
            postcode: input.giftAidDetails.postcode,
            country: input.giftAidDetails.country,
            created_at: new Date(),
            updated_at: new Date(),
          },
          { transaction: t },
        );
      }
    });
  }

  async markSucceededByPaymentIntentId(paymentIntentId: string): Promise<void> {
    await this.Donation.update(
      { status: "succeeded", updated_at: new Date() },
      { where: { stripe_payment_intent_id: paymentIntentId } },
    );
  }

  async markFailedByPaymentIntentId(paymentIntentId: string): Promise<void> {
    await this.Donation.update(
      { status: "failed", updated_at: new Date() },
      { where: { stripe_payment_intent_id: paymentIntentId } },
    );
  }
}
