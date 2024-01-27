import { NextFunction, Request, Response } from "express";

// services
import CartService from "../services/cartService";
import productService from "../services/productService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TCartSchema } from "../types/cart";
import { IAuthorizationRequest } from "../types/authorization";

export async function findAllCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cartItems = await CartService.findAll();
    res.json(cartItems);
  } catch (error) {
    ApiError.resourceNotFound("CartItem is empty");
  }
}

export async function findUserCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const cartItems =
      user && (await CartService.findCartItemsByUserId(user._id));
    res.json(cartItems);
  } catch (error) {
    ApiError.resourceNotFound("CartItem is empty");
  }
}

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newCartItemData: TCartSchema = req.body;
    const { user } = req as IAuthorizationRequest;
    // check if product exists
    const product = await productService.findById(newCartItemData.product);
    if (!product) {
      return next(ApiError.resourceNotFound("Product not found"));
    }
    // check if product is in stock
    const existingCartItem =
      user &&
      (await CartService.findCartItemByProductIdUserId(
        newCartItemData.product,
        user._id
      ));
    // calculate available stock
    const availableStock = existingCartItem
      ? product.stock - existingCartItem.quantity
      : product.stock;
    if (availableStock <= 0) {
      return next(ApiError.resourceNotFound("Product is out of stock"));
    }
    // update cart quantity if already exist
    if (existingCartItem) {
      const updatedCartItem = await CartService.updateCartQuantity(
        existingCartItem._id,
        existingCartItem.quantity + 1
      );
      return res.json(updatedCartItem);
    }
    // create new
    const newCartItem =
      user && (await CartService.addToCart(user._id, newCartItemData));
    res.status(201).json(newCartItem);
  } catch (error: any) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteFromCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const cartId = req.params.cartId;
    await CartService.deleteCartItemsByUserIdAndItemIds(user._id, [cartId]);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
