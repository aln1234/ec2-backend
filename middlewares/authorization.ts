import { NextFunction, Request, Response } from "express";

//error builder
import { ApiError } from "../errors/ApiError";

//service
import AuthService from "../services/authService";

//type
import {
  IAuthorizationRequest,
  IJwtAuthorizationPayload,
} from "../types/authorization";

//constant
import { ACCESS_TOKEN_SECRET } from "../constants/auth";

// Define a function to authenticate the request using the access token
export const authenticate = (req: Request, _: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(ApiError.forbidden("Missing or invalid token"));
  }

  try {
    const payload = AuthService.verifyToken(token, ACCESS_TOKEN_SECRET);

    if (!payload) {
      return next(ApiError.unauthorized("Invalid or missing access token"));
    }

    (req as IAuthorizationRequest).user = payload as IJwtAuthorizationPayload;

    next();
  } catch (error) {
    return next(ApiError.internal("Error in authentication"));
  }
};
