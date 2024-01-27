import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

//error builder
import { ApiError } from "../errors/ApiError";

export async function validateParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { params } = req;
    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const isValid = mongoose.Types.ObjectId.isValid(params[param]);
        if (!isValid) {
          const error = ApiError.badRequest("Invalid Params.");
          return res
            .status(error.code)
            .json({ code: error.code, message: error.message });
        }
      }
    }
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
}
