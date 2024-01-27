import express from "express";
import { createCheckout, retrieveOrder } from "../controllers/orderController";

import { authenticate } from "../middlewares/authorization";

const router = express.Router();

//stripe route

router.post("/create-checkout-session", authenticate, createCheckout);

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  retrieveOrder
);
export default router;
