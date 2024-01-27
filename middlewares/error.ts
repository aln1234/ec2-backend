import { NextFunction, Request, Response } from "express";

//error builder
import { ApiError } from "../errors/ApiError";

export function errorLoggingMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    res.status(error.code).json(error);
  } else {
    res.status(500).json({ code: 500, message: "👀 ERRROOOR!!" });
  }
}
