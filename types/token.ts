import { z } from "zod";
import { TokenSchema } from "../schemas/tokenSchema";

export type TTokenSchema = z.infer<typeof TokenSchema>;
