import { Sequelize } from "sequelize";
import { initDonationModel, DonationModel } from "./Donation.model";
import {
  initGiftAidDetailsModel,
  GiftAidDetailsModel,
} from "./GiftAidDetials.model";

export function initModels(sequelize: Sequelize) {
  initDonationModel(sequelize);
  initGiftAidDetailsModel(sequelize);

  DonationModel.hasOne(GiftAidDetailsModel, {
    foreignKey: "donation_id",
    as: "giftAidDetails",
    onDelete: "CASCADE",
  });

  GiftAidDetailsModel.belongsTo(DonationModel, {
    foreignKey: "donation_id",
    as: "donation",
  });

  return {
    DonationModel,
    GiftAidDetailsModel,
  };
}
