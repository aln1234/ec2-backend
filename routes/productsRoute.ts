import express from "express";

// controllers
import {
  createOneProduct,
  deleteProduct,
  searchProduct,
  findAllProduct,
  findOneProduct,
  updateProduct,
} from "../controllers/productsController";

// middlewares
import { validateParams } from "../middlewares/paramsValidate";
import { validateSchema } from "../middlewares/schemaValidate";
import { ProductSchema } from "../schemas/productSchema";
import { authenticate } from "../middlewares/authorization";
import { checkRoles } from "../middlewares/checkRoles";
import { checkPermission } from "../middlewares/checkPermission";
import { ROLE } from "../constants/roles";

// schema

const router = express.Router();

// routes
router.get("/", findAllProduct);
router.get("/search", searchProduct);
router.get("/:productId", validateParams, findOneProduct);
router.post(
  "/",
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("PRODUCTS_CREATE"),
  validateSchema(ProductSchema),
  createOneProduct
);
router.put(
  "/:productId",
  authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("PRODUCTS_UPDATE"),
  validateSchema(ProductSchema),
  updateProduct
);
router.delete(
  "/:productId",
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("PRODUCTS_DELETE"),
  validateParams,
  deleteProduct
);

export default router;
