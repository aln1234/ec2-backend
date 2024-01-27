// types
import mongoose, { Types } from "mongoose";

//model
import { Product } from "../models/Product";

//type
import { TProduct, TProductSchema } from "../types/product.js";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

async function findAll(
  perPage: number,
  pageNo: number,
  sorting: string,
  categoryId: string,
  name: string,
  minPrice: number,
  maxPrice: number
) {
  let query: any = {};
  console.log(categoryId, " I am category id");
  query.$and = [];

  if (categoryId) {
    query.$and.push({ categoryId: categoryId });
  }

  if (name) {
    let nameRegex = new RegExp(name, "i");
    query.$and.push({ name: { $regex: nameRegex } });
  }

  query.$and.push({ price: { $gte: minPrice, $lte: maxPrice } });

  if (query.$and.length === 0) {
    delete query.$and;
  }
  console.log(query, "I am query");
  const products = await Product.find(query)
    .populate("categoryId")
    .populate("sizes")
    .limit(perPage)
    .skip(perPage * (pageNo - 1))
    .sort(sorting);
  console.log(products, "I am products");
  return products;
}

async function findById(productId: string | Types.ObjectId) {
  return await Product.findById(productId).populate("categoryId");
}

async function createOne(product: TProductSchema) {
  const newProduct = new Product(product);
  const success = await newProduct.save();

  return success;
}

async function updateProduct(
  productId: string | Types.ObjectId,
  product: TProductSchema
) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
    new: true,
  }).populate("categoryId");
  return updatedProduct;
}

async function deleteProduct(productId: string | Types.ObjectId) {
  const product = await Product.findByIdAndDelete(productId);
  return product;
}

async function searchProduct(
  perPage: number,
  pageNo: number,
  sorting: string,
  regex: any
) {
  const products = await Product.find({
    name: { $in: regex },
  })
    .populate("categoryId")
    .populate("sizes")
    .limit(perPage)
    .skip(perPage * (pageNo - 1))
    .sort(sorting);
  return products;
}

export default {
  findById,
  findAll,
  createOne,
  updateProduct,
  deleteProduct,
  searchProduct,
};
