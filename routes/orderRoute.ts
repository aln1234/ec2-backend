import express from "express";

import { validateParams } from "../middlewares/paramsValidate";
import { authenticate } from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidate";
import { OrderBodySchema } from "../schemas/orderBodySchema";
import { findOrderByUserId } from "../controllers/orderController";

const router = express.Router();

//stripe route

router.get("/:userId", authenticate, findOrderByUserId);

export default router;
