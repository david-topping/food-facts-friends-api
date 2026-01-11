import { Donation } from "../entities/Donation";

export interface DonationProvider {
  save(donation: Donation): Promise<void>;

  findById(id: string): Promise<Donation | null>;

  markAsPaid(id: string, paymentIntentId: string): Promise<void>;
}
