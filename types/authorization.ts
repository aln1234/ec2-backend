import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IPermissionObj } from "permission";
import { TRole } from "./users";

export interface IJwtAuthorizationPayload extends JwtPayload {
  _id: string;
  email: string;
  role: TRole;
  permission?: IPermissionObj[];
}

export interface IAuthorizationRequest extends Request {
  user: IJwtAuthorizationPayload;
}
