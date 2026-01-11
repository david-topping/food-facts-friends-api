import { Router } from "express";
import { StripePaymentProvider } from "../../../outbound/payments/StripePaymentProvider";
import { CreateDonation } from "../../../../application/use-cases/CreateDonation";
import { CreateDonationController } from "./CreateDonationController";
import { createDonationSchema } from "./donation.schema";

const router = Router();

const paymentProvider = new StripePaymentProvider(
  process.env.STRIPE_SECRET_KEY!
);

// TODO: inject DonationRepository here (for db)
const createDonation = new CreateDonation(paymentProvider);
const controller = new CreateDonationController(createDonation);

router.post(
  "/",
  async (req, res, next) => {
    try {
      req.body = await createDonationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err: any) {
      return res.status(400).json({
        message: "Invalid donation payload",
        errors: err.errors,
      });
    }
  },
  (req, res) => controller.handle(req, res)
);

export default router;
