export class Donation {
  constructor(
    public readonly id: string,
    public readonly amountPence: number,
    public readonly email: string,
    public readonly giftAid: boolean
  ) {
    if (amountPence < 100) {
      throw new Error("Minimum donation is £1");
    }
  }
}
