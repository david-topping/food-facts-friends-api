import { Router } from "express";
import donationRoutes from "../../adapters/inbound/http/donations/donation.routes";
import webhookRoutes from "../../adapters/inbound/http/webhooks/webhook.routes";

export function registerRoutes(router: Router) {
  router.use("/donations", donationRoutes);
  router.use("/webhooks", webhookRoutes);
}
