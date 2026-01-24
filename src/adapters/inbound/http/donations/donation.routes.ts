import { Router } from "express";
import { validateSchema } from "../validateSchema";
import { createDonationSchema } from "./donation.schema";

import { CreateDonationController } from "./CreateDonationController";

type DonationControllers = {
  createDonationController: CreateDonationController;
};

export function createDonationRouter(controllers: DonationControllers) {
  const router = Router();

  router.post("/", validateSchema(createDonationSchema), (req, res, next) =>
    controllers.createDonationController.execute(req, res, next),
  );

  return router;
}
