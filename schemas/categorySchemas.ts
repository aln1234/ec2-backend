import { z } from "zod";

// schema
export const CategorySchema = z.strictObject({
  name: z.string({
    required_error: "Name is required",
  }),
  image: z.string().optional(),
});
