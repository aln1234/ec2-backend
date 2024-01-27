import { Types } from "mongoose";

//model
import { Size } from "../models/Size";

// types
import { TSizeSchema } from "../types/size";

async function findAll() {
  return await Size.find().lean();
}

async function findOne(sizeId: string | Types.ObjectId) {
  return await Size.findById(sizeId).lean();
}

async function createOne(size: TSizeSchema) {
  const newSize = new Size(size);
  return await newSize.save();
}

async function updateSize(sizeId: string | Types.ObjectId, data: TSizeSchema) {
  return await Size.findByIdAndUpdate(sizeId, data, {
    new: true,
  });
}

async function deleteSize(sizeId: string | Types.ObjectId) {
  return await Size.findByIdAndDelete(sizeId);
}

export default {
  findAll,
  findOne,
  createOne,
  updateSize,
  deleteSize,
};
