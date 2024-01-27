import mongoose, { Types } from "mongoose";

//model
import { Order } from "../models/Order";
import { OrderProduct } from "../models/Order_Products";

//type
import { TOrderBodySchema } from "../types/order";
import { TProduct } from "../types/product";

//constant
import { PAYMENT_STATUS } from "../constants/order";

//find All order
async function findAll(limit: number, page: number, sort: string) {
  return await Order.find()
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate({
      path: "products",
      select: {
        _id: 1,
        name: 1,
        price: 1,
      },
    })
    .limit(Number(limit))
    .skip(Number(limit) * (page - 1))
    .sort(sort);
}

//find by id
async function findById(orderId: string | Types.ObjectId) {
  return await Order.findById(orderId)
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate({
      path: "products",
      select: {
        _id: 1,
        name: 1,
        price: 1,
      },
    });
}

async function createOne(data: any) {
  const { paymentType, paymentStatus } = data.payment;
  console.log(paymentType[0], paymentStatus);
  const order = new Order({
    email: data.email,
    userId: data.userId,
    name: data.name,
    phone: data.phone,
    products: data.products,
    address: data.address,
    payment: {
      payment_type: paymentType[0],
      payment_status: paymentStatus,
    },
    subtotal: data.subtotal,
    total: data.total,
  });

  return await order.save();
}

async function getOrderByUserId(userId: string) {
  const orders = await Order.find({
    userId: userId,
  });

  return orders;
}

async function createOrderProduct(
  product: TProduct,
  orderId: string | Types.ObjectId,
  userId: string | Types.ObjectId,
  quantity: number
) {
  var orderProduct = new OrderProduct({
    user: userId,
    order: orderId,
    product: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    images: product.images,
    quantity: quantity,
  });
  await orderProduct.save();
  return orderProduct;
}

export default {
  createOne,
  findAll,
  findById,
  getOrderByUserId,
  createOrderProduct,
};
