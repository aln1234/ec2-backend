import { z } from "zod";
import { SizeSchema } from "../schemas/sizeSchema";

export type TSizeSchema = z.infer<typeof SizeSchema>;

export type TSize = TSizeSchema & { _id: string };
