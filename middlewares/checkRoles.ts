import { NextFunction, Request, Response } from "express";

//error builder
import { ApiError } from "../errors/ApiError";

//type
import { TRole } from "../types/users";
import { IAuthorizationRequest } from "./../types/authorization";

export function checkRoles(...roles: TRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as IAuthorizationRequest).user;
    const role = user?.role.toUpperCase() as TRole;
    const hasMatchedRoles = user && roles.includes(role);
    if (!hasMatchedRoles) {
      next(ApiError.forbidden("You are not allowed to access this"));
      return;
    }
    next();
  };
}
