import { Request, Response } from "express";

//error builder
import { ApiError } from "../errors/ApiError";

export function routeNotFound(_: Request, res: Response) {
  const error = ApiError.resourceNotFound("Route not found.");
  res.status(error.code).json({ code: error.code, msg: error.message });
}
