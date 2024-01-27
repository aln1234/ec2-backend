import express from "express";

// controllers
import {
  createOneSize,
  deleteSize,
  findAllSize,
  findSingleSize,
  updateSize,
} from "../controllers/sizesController";

// middlewares
import { validateSchema } from "../middlewares/schemaValidate";

// schema
import { SizeSchema } from "../schemas/sizeSchema";
import { authenticate } from "../middlewares/authorization";
import { checkRoles } from "../middlewares/checkRoles";
import { checkPermission } from "../middlewares/checkPermission";
import { validateParams } from "../middlewares/paramsValidate";
import { ROLE } from "../constants/roles";

const router = express.Router();

// routes
router.get(
  "/",
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("SIZES_READ"),
  findAllSize
);
router.post(
  "/",
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("SIZES_CREATE"),
  validateSchema(SizeSchema),
  createOneSize
);
router.get(
  "/:sizeId",
  // validateParams,
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("SIZES_READ"),
  findSingleSize
);
router.put(
  "/:sizeId",
  validateParams,
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("SIZES_UPDATE"),
  validateSchema(SizeSchema),
  updateSize
);
router.delete(
  "/:sizeId",
  // validateParams,
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("SIZES_DELETE"),
  deleteSize
);

export default router;
