import { NextFunction, Request, Response } from "express";

//error builder
import { ApiError } from "../errors/ApiError";

//type
import { IAuthorizationRequest } from "../types/authorization";
import { TUserPermission } from "permission";

export function checkPermission(...permissions: TUserPermission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as IAuthorizationRequest).user;
    const userPermissions = user?.permission?.map(
      (permission) => permission.name
    );
    const hasMatchedPermission =
      user &&
      permissions.some((permission) => {
        return userPermissions?.includes(permission);
      });
    if (!hasMatchedPermission) {
      next(ApiError.forbidden("You do not have permission to access this"));
      return;
    }
    next();
  };
}
