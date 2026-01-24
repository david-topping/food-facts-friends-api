import { Request, Response, NextFunction } from "express";
import {
  CreateDonation,
  type GiftAidDetails,
} from "../../../../application/useCases/CreateDonation";
import { createDonationSchema } from "./createDonation.schema";

export class CreateDonationController {
  constructor(private useCase: CreateDonation) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await createDonationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (validated.giftAid) {
        if (!validated.giftAidDetails) {
          return res.status(400).json({
            error: "giftAidDetails is required when giftAid is true",
          });
        }

        const result = await this.useCase.execute({
          amountPence: validated.amountPence,
          email: validated.email,
          giftAid: true as const,
          giftAidDetails: validated.giftAidDetails as GiftAidDetails,
        });

        return res.status(201).json(result);
      }

      const result = await this.useCase.execute({
        amountPence: validated.amountPence,
        email: validated.email,
        giftAid: false as const,
      });

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
