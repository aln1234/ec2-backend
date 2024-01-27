import mongoose, { Schema } from "mongoose";
import { TTokenSchema } from "../types/token";
//
const TokenSchema = new Schema<TTokenSchema>({
  refreshToken: { type: String, required: true },
});

export const Token = mongoose.model("Token", TokenSchema);
