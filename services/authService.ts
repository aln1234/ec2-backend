import jsonwebtoken from "jsonwebtoken";

//model
import { Token } from "../models/Token";

//type
import { TUser } from "../types/users";
import { IJwtAuthorizationPayload } from "../types/authorization";

//constant
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../constants/auth";

//Define a funciton to generate an access token
const generateAccessToken = async (user: TUser) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    permission: user.permission,
  };
  const options = { expiresIn: ACCESS_TOKEN_EXPIRES_IN };
  return jsonwebtoken.sign(payload, ACCESS_TOKEN_SECRET, options);
};

// Define a function to generate a refresh token
const generateRefreshToken = async (user: TUser) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    permission: user.permission,
  };
  return jsonwebtoken.sign(payload, REFRESH_TOKEN_SECRET);
};

//save refresh token
async function saveRefreshToken(token: string) {
  const newToken = new Token({ refreshToken: token });
  return await newToken.save();
}

// Define a function to verify a token
const verifyToken = (token: string, secret: string) => {
  try {
    return jsonwebtoken.verify(token, secret) as IJwtAuthorizationPayload;
  } catch (error) {
    return null;
  }
};

export default {
  generateRefreshToken,
  generateAccessToken,
  verifyToken,
  saveRefreshToken,
};
