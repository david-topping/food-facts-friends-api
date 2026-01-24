import * as yup from "yup";

const giftAidDetailsSchema = yup.object({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  addressLine1: yup.string().trim().required(),
  addressLine2: yup.string().trim().notRequired(),
  city: yup.string().trim().required(),
  postcode: yup.string().trim().required(),
  country: yup.string().trim().default("United Kingdom"),
});

export const createDonationSchema = yup.object({
  amountPence: yup
    .number()
    .required()
    .integer()
    .min(500, "Minimum donation is £5"),

  email: yup.string().trim().email().required(),

  giftAid: yup.boolean().required(),

  giftAidDetails: yup.mixed().when("giftAid", {
    is: true,
    then: () => giftAidDetailsSchema.required(),
    otherwise: () => yup.mixed().strip().notRequired(),
  }),
});
