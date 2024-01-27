import mongoose from "mongoose";
import bcrypt from "bcrypt";

export function isNumber(param: any): boolean {
  return !isNaN(parseFloat(param)) && isFinite(param);
}

export function convertStringToMongooseId(id: string) {
  return new mongoose.Types.ObjectId(id);
}

export async function generatePasswordHash(password: string, saltRound = 10) {
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(password, salt);
}
