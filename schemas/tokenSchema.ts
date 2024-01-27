import { z } from "zod";

export const TokenSchema = z.strictObject({
  refreshToken: z.string({
    required_error: "Refresh Token is required",
  }),
});
