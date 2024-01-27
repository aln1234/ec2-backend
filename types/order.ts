import { z } from "zod";
import { OrderSchema } from "../schemas/orderSchema";
import { OrderBodySchema } from "../schemas/orderBodySchema";

export type TOrderSchema = z.infer<typeof OrderSchema>;

export type TOrderBodySchema = z.infer<typeof OrderBodySchema>;
