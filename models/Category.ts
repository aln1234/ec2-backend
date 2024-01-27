import mongoose from "mongoose";
//
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
  id: ObjectId,
  name: String,
  image: String,
});

export const Category = mongoose.model("Category", CategorySchema);
