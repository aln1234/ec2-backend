import { z } from "zod";
import { AddressSchema } from "../schemas/addressSchema";

export type TAddressSchema = z.infer<typeof AddressSchema>;

export type TAddress = TAddressSchema & { _id: number };
