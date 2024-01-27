import mongoose from "mongoose";
import { TOrderSchema } from "../types/order";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../constants/order";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  email: String,
  userId: String,
  name: String,
  phone: String,
  products: [],
  address: {
    city: String,
    country: String,
    postalCode: String,
  },
  payment: {
    payment_type: String,
    payment_status: String,
  },
  subtotal: Number,
  total: Number,
});

export const Order = mongoose.model("Order", OrderSchema);
