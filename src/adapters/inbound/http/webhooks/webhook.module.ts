import Stripe from "stripe";
import { requireEnv } from "../../../../infrastructure/config/env";
import { createSequelize } from "../../../../infrastructure/db/sequalize";

import { SequelizeDonationRepository } from "../../../outbound/persistence/sequelize/SequelizeDonationRepository";
import { StripeWebhookController } from "./StripeWebhookController";
import { createStripeWebhookRouter } from "./stripeWebhook.routes";

export function buildStripeWebhookRouter() {
  const stripeSk = requireEnv("STRIPE_SECRET_KEY");
  const webhookSecret = requireEnv("STRIPE_WEBHOOK_SECRET");

  const sequelize = createSequelize();
  const donationRepo = new SequelizeDonationRepository(sequelize);

  const stripe = new Stripe(stripeSk);

  const stripeWebhookController = new StripeWebhookController(
    stripe,
    donationRepo,
    webhookSecret,
  );

  return createStripeWebhookRouter({
    stripeWebhookController,
  });
}
