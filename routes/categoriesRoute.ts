import express from "express";

// controllers
import {
  createOneCategory,
  deleteCategory,
  filterProductByCategory,
  findAllCategory,
  findOneCategory,
  updateCategory,
} from "../controllers/categoriesController";

// middlewares
import { validateSchema } from "../middlewares/schemaValidate";

// schema
import { CategorySchema } from "../schemas/categorySchemas";
import { validateParams } from "../middlewares/paramsValidate";
import { checkRoles } from "../middlewares/checkRoles";
import { checkPermission } from "../middlewares/checkPermission";
import { authenticate } from "../middlewares/authorization";
import { ROLE } from "../constants/roles";

const router = express.Router();

// routes
router.get("/", findAllCategory);
router.get("/:categoryId", validateParams, findOneCategory);
router.get("/:categoryId/products", validateParams, filterProductByCategory);
router.post(
  "/",
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("CATEGORIES_CREATE"),
  validateSchema(CategorySchema),
  createOneCategory
);
router.put(
  "/:categoryId",
  validateParams,
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("CATEGORIES_UPDATE"),
  validateSchema(CategorySchema),
  updateCategory
);

router.delete(
  "/:categoryId",
  validateParams,
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("CATEGORIES_DELETE"),
  deleteCategory
);

export default router;
