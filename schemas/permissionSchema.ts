import { z } from "zod";

export const PermissionSchema = z.strictObject({
  name: z.string({
    required_error: "Name is required",
  }),
  description: z.string().optional(),
});
