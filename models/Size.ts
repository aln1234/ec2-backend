//
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  name: { type: String, required: true },
});

export const Size = mongoose.model("Size", SizeSchema);
