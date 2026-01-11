import { Router } from "express";
import { StripeWebhookController } from "./StripeWebhookController";

const router = Router();
const controller = new StripeWebhookController();

router.post("/stripe", (req, res) => controller.handle(req, res));

export default router;
