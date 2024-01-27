import { z } from "zod";
import { ProductSchema } from "../schemas/productSchema";

export type TProductSchema = z.infer<typeof ProductSchema>;

export type TProduct = TProductSchema & { _id: string };
