import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { DonationRepository } from "../../../../domain/ports/DonationRepository";

export class StripeWebhookController {
  constructor(
    private readonly stripe: Stripe,
    private readonly donationRepository: DonationRepository,
    private readonly webhookSecret: string,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers["stripe-signature"];

      if (!signature || typeof signature !== "string") {
        return res.status(400).json({ error: "Missing Stripe signature" });
      }

      const event = this.stripe.webhooks.constructEvent(
        req.body,
        signature,
        this.webhookSecret,
      );

      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.donationRepository.markSucceededByPaymentIntentId(
          paymentIntent.id,
        );
      }

      if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.donationRepository.markFailedByPaymentIntentId(
          paymentIntent.id,
        );
      }

      return res.status(200).json({ received: true });
    } catch (err) {
      return next(err);
    }
  }
}
