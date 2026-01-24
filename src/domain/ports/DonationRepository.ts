import { DonationRecord } from "../entities/DonationRecord";

export interface DonationRepository {
  save(input: DonationRecord): Promise<void>;
  findByPaymentIntentId(paymentIntentId: string): Promise<boolean>;
  markSucceededByPaymentIntentId(paymentIntentId: string): Promise<void>;
  markFailedByPaymentIntentId(paymentIntentId: string): Promise<void>;
}
