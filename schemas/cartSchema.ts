import { z } from "zod";

export const CartSchema = z.strictObject({
  product: z.string({
    required_error: "Product ID is required",
  }),
  user: z.string({
    required_error: "User ID is required",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
  }),
  total: z
    .number({
      required_error: "Total is required",
    })
    .min(0),
});

export const requestSchema = z.object({
  body: CartSchema,
});
