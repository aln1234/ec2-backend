import { z } from "zod";

import { CartSchema } from "../schemas/cartSchema";

export type TCartSchema = z.infer<typeof CartSchema>;
export type TCart = TCartSchema & { _id: string };
