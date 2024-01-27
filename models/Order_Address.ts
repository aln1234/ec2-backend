import mongoose from "mongoose";
import { ORDER_ADDRESS_TYPE } from "../constants/order";
//
const Schema = mongoose.Schema;

const OrderAddressSchema = new Schema({
  address: {
    country: { type: String },
    city: { type: String },
    street: { type: String },
    zipCode: { type: Number },
  },
  method: { type: String },
  cost: { type: String },
  type: { type: String, enum: ORDER_ADDRESS_TYPE },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
});

export const OrderAddress = mongoose.model("OrderAddress", OrderAddressSchema);
