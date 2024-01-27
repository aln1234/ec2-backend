import { z } from "zod";
import { USERROLES } from "../constants/roles";
import mongoose from "mongoose";

export const UserSchema = z.strictObject({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
  firstName: z
    .string({
      required_error: "FirstName is required",
    })
    .min(2)
    .max(50),
  lastName: z
    .string({
      required_error: "LastName is required",
    })
    .min(2)
    .max(50),
  role: z.enum(USERROLES).optional(),
  avatar: z.string().optional(),
  permission: z.array(z.string()).optional(),
  phoneNumber: z.number().optional(),
});

export const UserUpdateSchema = UserSchema.partial();
