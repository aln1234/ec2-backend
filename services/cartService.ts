import { Types } from "mongoose";

//model in the file
import { Cart } from "../models/Cart";

//type
import { TCartSchema } from "../types/cart";
import { TProduct } from "../types/product";

async function findAll() {
  return await Cart.find().populate("product").populate("user");
}

async function findCartItemByProductIdUserId(
  product: string | Types.ObjectId,
  user: string | Types.ObjectId
) {
  const existingCartItem = await Cart.findOne({
    product: product,
    user: user,
  });
  return existingCartItem;
}

async function findSingleCart(cartId: string | Types.ObjectId) {
  return await Cart.findById(cartId).populate("product").populate("user");
}

async function findCartItemsByUserId(userId: string | Types.ObjectId) {
  return await Cart.find({ user: userId });
}

async function findCartItemsByUserIdAndItemIds(
  userId: string | Types.ObjectId,
  cartIds: string[] | Types.ObjectId[]
) {
  return await Cart.find({ user: userId, _id: { $in: cartIds } })
    .populate<{
      product: TProduct;
    }>("product")
    .populate("user");
}

async function addToCart(
  userId: string | Types.ObjectId,
  cartItem: TCartSchema
) {
  const newCartItem = new Cart({
    ...cartItem,
    user: userId,
  });
  return await newCartItem.save();
}

async function updateCartQuantity(
  cartId: string | Types.ObjectId,
  quantity: number
) {
  return await Cart.findByIdAndUpdate(
    cartId,
    {
      quantity: quantity,
    },
    { new: true }
  );
}

async function deleteCartById(cartId: string | Types.ObjectId) {
  return await Cart.findByIdAndDelete(cartId);
}

async function deleteCartItemsByUserIdAndItemIds(
  userId: string | Types.ObjectId,
  cartIds: string[] | Types.ObjectId[]
) {
  return await Cart.deleteMany({ user: userId, _id: { $in: cartIds } });
}

export default {
  addToCart,
  findAll,
  findCartItemByProductIdUserId,
  updateCartQuantity,
  findSingleCart,
  deleteCartById,
  findCartItemsByUserId,
  findCartItemsByUserIdAndItemIds,
  deleteCartItemsByUserIdAndItemIds,
};
