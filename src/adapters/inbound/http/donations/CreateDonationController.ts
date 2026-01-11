import { Request, Response } from "express";
import { CreateDonation } from "../../../../application/use-cases/CreateDonation";

export class CreateDonationController {
  constructor(private useCase: CreateDonation) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(req.body);
    res.status(201).json(result);
  }
}
