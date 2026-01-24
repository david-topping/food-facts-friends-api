import { createStripePaymentProvider } from "../../../../infrastructure/payments/stripe";
import { createSequelize } from "../../../../infrastructure/db/sequalize";

import { SequelizeDonationRepository } from "../../../outbound/persistence/sequelize/SequelizeDonationRepository";

import { CreateDonation } from "../../../../application/useCases/CreateDonation";
import { CreateDonationController } from "./CreateDonationController";
import { createDonationRouter } from "./donation.routes";

export function buildDonationRouter() {
  const sequelize = createSequelize();
  const paymentProvider = createStripePaymentProvider();

  const donationRepo = new SequelizeDonationRepository(sequelize);

  const createDonationUseCase = new CreateDonation(
    paymentProvider,
    donationRepo,
  );
  const createDonationController = new CreateDonationController(
    createDonationUseCase,
  );

  return createDonationRouter({
    createDonationController,
  });
}
