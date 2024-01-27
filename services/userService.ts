import mongoose, { Types } from "mongoose";

// model
import { User } from "../models/User";
import { Permission } from "../models/Permission";

// types
import { TUser, TUserSchema, TUserUpdateSchema } from "../types/users";
import { TPermissionSchema } from "../types/permission";

async function findAllUser() {
  return await User.find().populate({
    path: "permission",
    select: {
      name: 1,
      _id: 0,
    },
  });
}

async function findById(userId: string | Types.ObjectId) {
  return await User.findById(userId).select("-password").populate("permission");
}

async function findByEmail(email: string) {
  return await User.findOne({ email });
}

async function createUser(user: TUserSchema) {
  const newUser = new User(user);
  return await newUser.save();
}

async function deleteUser(userId: string | Types.ObjectId) {
  return await User.findByIdAndDelete(userId);
}

async function updateUserInfo(
  userId: string | Types.ObjectId,
  data: TUserUpdateSchema
) {
  const success = await User.findByIdAndUpdate(userId, data, {
    new: true,
  });
  return success;
}

async function createPermission(permission: TPermissionSchema) {
  const newPermission = new Permission(permission);
  return await newPermission.save();
}

async function findAllPermissions() {
  return await Permission.find().lean().exec();
}

export default {
  findById,
  findAllUser,
  createUser,
  deleteUser,
  updateUserInfo,
  findByEmail,
  createPermission,
  findAllPermissions,
};
