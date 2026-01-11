import * as yup from "yup";

export const createDonationSchema = yup.object({
  amountPence: yup
    .number()
    .required()
    .integer()
    .min(100, "Minimum donation is £1"),

  email: yup.string().email().required(),

  giftAid: yup.boolean().required(),
});
