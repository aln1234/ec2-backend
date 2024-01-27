import { z } from "zod";
import { CategorySchema } from "../schemas/categorySchemas";

export type TCategorySchema = z.infer<typeof CategorySchema>;

export type TCategory = TCategorySchema & { _id: string };
