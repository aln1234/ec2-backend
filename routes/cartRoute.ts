import express from "express";

// controllers
import {
  addToCart,
  deleteFromCart,
  findAllCart,
  findUserCart,
} from "../controllers/cartController";

// middlewares
import { validateSchema } from "../middlewares/schemaValidate";
import { CartSchema } from "../schemas/cartSchema";
import { authenticate } from "../middlewares/authorization";
import { validateParams } from "../middlewares/paramsValidate";

// schema
const router = express.Router();

// routes
router.get("/", authenticate, findUserCart);
router.post("/", authenticate, validateSchema(CartSchema), addToCart);
router.delete("/:cartId", validateParams, authenticate, deleteFromCart);

export default router;
