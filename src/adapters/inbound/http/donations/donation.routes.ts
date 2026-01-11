import { Router } from "express";
import { StripePaymentProvider } from "../../../outbound/payments/StripePaymentProvider";
import { CreateDonation } from "../../../../application/use-cases/CreateDonation";
import { CreateDonationController } from "./CreateDonationController";
import { createDonationSchema } from "./donation.schema";
import { validateSchema } from "../middleware/validateSchema";

const router = Router();

const paymentProvider = new StripePaymentProvider(
  process.env.STRIPE_SECRET_KEY!
);

// TODO: inject DonationRepository here (for db)
const createDonation = new CreateDonation(paymentProvider);
const controller = new CreateDonationController(createDonation);

router.post("/", validateSchema(createDonationSchema), (req, res) =>
  controller.handle(req, res)
);

export default router;
