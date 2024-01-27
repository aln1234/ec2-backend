import { z } from "zod";

// schema
export const SizeSchema = z.strictObject({
  name: z.string({
    required_error: "Name is required",
  }),
});
