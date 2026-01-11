import { Request, Response } from "express";

export class StripeWebhookController {
  async handle(req: Request, res: Response) {
    // verify signature
    // handle payment_intent.succeeded
    // mark donation as completed
    res.sendStatus(200);
  }
}
