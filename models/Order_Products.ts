import mongoose from "mongoose";

const Schema = mongoose.Schema;
//
const OrderProductSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  discount: { type: Number, default: 0 },
  quantity: { type: Number, required: true },
});

export const OrderProduct = mongoose.model("OrderProduct", OrderProductSchema);
