import { Router } from "express";
import { StripeWebhookController } from "./StripeWebhookController";

type WebhookControllers = {
  stripeWebhookController: StripeWebhookController;
};

export function createStripeWebhookRouter(controllers: WebhookControllers) {
  const router = Router();

  router.post("/", (req, res, next) =>
    controllers.stripeWebhookController.handle(req, res, next),
  );

  return router;
}
