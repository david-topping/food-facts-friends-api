import { Request, Response, NextFunction } from "express";
import { CreateDonation } from "../../../../application/useCases/CreateDonation";

export class CreateDonationController {
  constructor(private useCase: CreateDonation) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.useCase.execute({
        amountPence: req.body.amountPence,
        email: req.body.email,
        giftAid: req.body.giftAid,
      });

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
