import { TRole } from "../types/users";

export const ADMIN = "ADMIN";
export const USER = "USER";
export const USERROLES = [ADMIN, USER] as const;
export const ROLE = {
  USER: USER,
  ADMIN: ADMIN,
} as const;
