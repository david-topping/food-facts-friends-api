import { Router } from "express";

import { validateSchema } from "../validateSchema";
import { createDonationSchema } from "./createDonation.schema";
import { CreateDonationController } from "./CreateDonation.Controller";

type DonationControllers = {
  createDonationController: CreateDonationController;
};

export function createDonationRouter(controllers: DonationControllers) {
  const router = Router();

  router.post(
    ["", "/"],
    validateSchema(createDonationSchema),
    (req, res, next) =>
      controllers.createDonationController.execute(req, res, next),
  );

  return router;
}
