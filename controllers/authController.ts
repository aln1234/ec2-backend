import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

// error builder
import { ApiError } from "../errors/ApiError";

// services
import AuthService from "../services/authService";
import UserService from "../services/userService";

// types
import { TUserSchema } from "../types/users";
import { IAuthorizationRequest } from "../types/authorization";

// utils
import { generatePasswordHash } from "../utils/helpers";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await UserService.findByEmail(email);
    if (!user) {
      return res.status(404).json("Invalid email");
    }
    const userWithPermission = await user.populate({
      path: "permission",
      select: {
        name: 1,
        _id: 0,
      },
    });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json("Incorrect password");
    }
    const accessToken = await AuthService.generateAccessToken(
      userWithPermission
    );
    const refreshToken = await AuthService.generateRefreshToken(
      userWithPermission
    );
    const token = await AuthService.saveRefreshToken(refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function registerUser(
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
    const userWithPermission = await user.populate({
      path: "permission",
      select: {
        name: 1,
        _id: 0,
      },
    });
    const accessToken = await AuthService.generateAccessToken(
      userWithPermission
    );
    const refreshToken = await AuthService.generateRefreshToken(
      userWithPermission
    );
    await AuthService.saveRefreshToken(refreshToken);
    res
      .status(201)
      .json({ user: userWithPermission, accessToken, refreshToken });
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const userProfile = user && (await UserService.findById(user._id));
    if (!userProfile) {
      return res.status(404).json("User profile not found");
    }
    res.json(userProfile);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export default {
  login,
  getProfile,
};
