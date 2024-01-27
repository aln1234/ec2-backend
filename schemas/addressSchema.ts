import { z } from "zod";

// schema
export const AddressSchema = z.strictObject({
  country: z.string({
    required_error: "Country is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  street: z.string({
    required_error: "street is required",
  }),
  zipCode: z.string({
    required_error: "zipCode is required",
  }),
  user: z
    .string({
      required_error: "User ID is required",
    })
    .optional(),
});
