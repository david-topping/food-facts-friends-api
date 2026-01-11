import { Express } from "express";
import donationRoutes from "../../adapters/inbound/http/donations/donation.routes";
import webhookRoutes from "../../adapters/inbound/http/webhooks/webhook.routes";

export function registerRoutes(app: Express) {
  app.use("/donations", donationRoutes);
  app.use("/webhooks", webhookRoutes);
}
