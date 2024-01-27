import { Request, Response, NextFunction } from "express";

// services
import UserService from "../services/userService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TUser, TUserSchema } from "../types/users";
import { TPermissionSchema } from "../types/permission";

//utils
import { generatePasswordHash } from "../utils/helpers";

export async function findAllUser(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await UserService.findAllUser();
    res.json(users);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function findSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const user = await UserService.findById(userId);
    if (!user) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
    res.json(user);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser: TUserSchema = req.body;
    const checkUser = await UserService.findByEmail(newUser.email);
    if (checkUser) {
      return res.status(400).json("Username already exists");
    }
    newUser.password = await generatePasswordHash(newUser.password);
    const user = await UserService.createUser(newUser);
    res.status(201).json(user);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    await UserService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal error..."));
  }
}
export async function updateUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const userData: TUser = req.body;
    if (userData.password) {
      userData.password = await generatePasswordHash(userData.password);
    }
    const updatedUser = await UserService.updateUserInfo(userId, userData);
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    next(ApiError.internal("Internal server error"));
  }
}

export async function getAllPermissions(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const permissions = await UserService.findAllPermissions();
    res.json(permissions);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function addPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newPermission: TPermissionSchema = req.body;
    const permission = await UserService.createPermission(newPermission);
    res.status(201).json(permission);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export default {
  findAllUser,
  findSingleUser,
  createUser,
  deleteUser,
  updateUserInfo,
};
