import express from "express";

// controllers
import {
  findAllUser,
  findSingleUser,
  createUser,
  deleteUser,
  updateUserInfo,
  addPermission,
  getAllPermissions,
} from "../controllers/usersController";

// middlewares
import { validateParams } from "../middlewares/paramsValidate";
import { validateSchema } from "../middlewares/schemaValidate";

// schema
import { UserSchema, UserUpdateSchema } from "../schemas/userSchemas";
import { authenticate } from "../middlewares/authorization";
import { checkRoles } from "../middlewares/checkRoles";
import { checkPermission } from "../middlewares/checkPermission";
import { ROLE } from "../constants/roles";
import { PermissionSchema } from "../schemas/permissionSchema";
const router = express.Router();

// routes

//permissions
router.post(
  "/permissions",
  authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("PERMISSIONS_CREATE"),
  validateSchema(PermissionSchema),
  addPermission
);
router.get(
  "/permissions",
  authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("PERMISSIONS_READ"),
  getAllPermissions
);

// users
router.get(
  "/",
  authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("USERS_READ"),
  findAllUser
);

router.get(
  "/:userId",
  authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("USERS_READ"),
  validateParams,
  findSingleUser
);

router.post(
  "/",

  validateSchema(UserSchema),
  createUser
);
router.delete(
  "/:userId",
  authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("USERS_DELETE"),
  validateParams,
  deleteUser
);
router.put(
  "/:userId",
  authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("USERS_UPDATE"),
  validateParams,
  validateSchema(UserUpdateSchema),
  updateUserInfo
);

export default router;
