import { Express } from "express";
import donationRoutes from "../../adapters/inbound/http/donations/donation.routes";
import webhookRoutes from "../../adapters/inbound/http/webhooks/Webhook.routes";

export function registerRoutes(app: Express) {
  app.use("/donations", donationRoutes);
  app.use("/webhooks", webhookRoutes);
}
