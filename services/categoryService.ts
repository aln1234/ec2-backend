import mongoose, { Types } from "mongoose";

// types
import { TCategory, TCategorySchema } from "../types/category";

//model
import { Category } from "../models/Category";
import { Product } from "../models/Product";

async function findAll() {
  return await Category.find().lean().exec();
}

async function findOne(categoryId: string | Types.ObjectId) {
  const category = await Category.findById(categoryId);
  return category;
}

async function createOne(category: TCategorySchema) {
  let categoryExists = await Category.exists({ name: category.name });
  if (categoryExists) {
    return null;
  } else {
    const newCategory = new Category(category);
    return await newCategory.save();
  }
}

async function updateCategory(
  categoryId: string | Types.ObjectId,
  category: TCategorySchema
) {
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    category,
    {
      new: true,
    }
  );
  return updatedCategory;
}

async function deleteCategory(categoryId: string | Types.ObjectId) {
  const category = await Category.findByIdAndDelete(categoryId);
  return category;
}

const getProductsByCategory = async (
  categoryId: string | Types.ObjectId,
  page: number,
  limit: number
) => {
  return Product.find({ category: categoryId })
    .populate("category")
    .limit(limit)
    .skip(page * limit)
    .lean()
    .exec();
};

export default {
  findOne,
  findAll,
  createOne,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};
