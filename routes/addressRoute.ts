import express from "express";

// controllers
import {
  createAddress,
  deleteAddress,
  findAllAddress,
  findSingleAddress,
  updateAddress,
} from "../controllers/addressController";

// middlewares
import { validateParams } from "../middlewares/paramsValidate";
import { validateSchema } from "../middlewares/schemaValidate";
// schema
import { AddressSchema } from "../schemas/addressSchema";

const router = express.Router();

// routes
router.get("/", findAllAddress);
router.post("/", validateSchema(AddressSchema), createAddress);
router.get("/:addressId", validateParams, findSingleAddress);
router.put(
  "/:addressId",
  validateParams,
  validateSchema(AddressSchema),
  updateAddress
);
router.delete("/:addressId", validateParams, deleteAddress);

export default router;
