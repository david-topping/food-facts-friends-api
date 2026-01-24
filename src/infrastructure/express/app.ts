import express from "express";
import { errorHandler } from "./errorHandler";
import { buildCorsMiddleware } from "./cors";

import { buildDonationRouter } from "../../adapters/inbound/http/donations/donation.module";
import { buildStripeWebhookRouter } from "../../adapters/inbound/http/webhooks/webhook.module";

export const app = express();

const API_BASE_PATH = process.env.API_BASE_PATH || "";

app.use(buildCorsMiddleware());

app.use(
  `${API_BASE_PATH}/webhooks/stripe`,
  express.raw({ type: "application/json" }),
  buildStripeWebhookRouter(),
);

app.use(express.json());

const router = express.Router();
app.use(API_BASE_PATH, router);

router.use("/donations", buildDonationRouter());

app.use(errorHandler);
