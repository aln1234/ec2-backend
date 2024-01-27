import mongoose from "mongoose";
//
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

export const Cart = mongoose.model("Cart", CartSchema);
