import { NextFunction, Request, Response } from "express";

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const currentTime = new Date();

  const formattedDate = currentTime.toISOString();
  console.log(`${req.method} ${req.url} ${formattedDate}`);

  res.once("finish", () => {
    console.log(`${res.statusCode} ${res.statusMessage}`);
  });

  next();
}
