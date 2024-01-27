import mongoose from "mongoose";
import { TProductSchema } from "../types/product";
//
const Schema = mongoose.Schema;

const ProductSchema = new Schema<TProductSchema>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  categoryId: { type: String, ref: "Category", required: true },
  stock: { type: Number, required: true },
  sizes: [
    {
      type: String,
      ref: "Size",
    },
  ],
});

export const Product = mongoose.model("Product", ProductSchema);
