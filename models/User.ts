import mongoose, { Schema } from "mongoose";
import { TUser, TUserSchema } from "../types/users";
import { USERROLES } from "../constants/roles";
//
const UserSchema = new Schema<TUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: USERROLES, default: "USER" },
  avatar: { type: String },
  permission: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
  phoneNumber: { type: String },
});

export const User = mongoose.model("User", UserSchema);
