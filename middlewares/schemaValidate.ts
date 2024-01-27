import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateSchema = (schema: z.Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorResponse = {
          issues: err.errors.map((error) => ({
            path: error.path.map((path) => path.toString()),
            code: error.code,
            message: error.message,
          })),
          name: "ValidationError",
        };
        return res.status(400).json(errorResponse);
      }

      // If it's not a ZodError, you might want to handle it differently
      return res.status(400).json(err);
    }
  };
};
