import { NextFunction, Request, Response } from "express";

// services
import addressService from "../services/addressService.js";

// error builder
import { ApiError } from "../errors/ApiError.js";

// types
import { TAddressSchema } from "../types/address.js";

export async function findAllAddress(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addresses = await addressService.findAll();
    res.json(addresses);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function findSingleAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addressId = req.params.addressId;
    const address = await addressService.findOne(addressId);
    if (!address) {
      const notFoundError = ApiError.resourceNotFound("Address not found.");
      return next(notFoundError);
    }
    res.json(address);
  } catch (error) {
    const internalServerError = ApiError.internal("Internal server error.");
    next(internalServerError);
  }
}

export async function createAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newAddress: TAddressSchema = req.body;
    const address = await addressService.createOne(newAddress);
    res.status(201).json(address);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addressId = req.params.addressId;
    const updateAddressData: TAddressSchema = req.body;
    const address = await addressService.findOne(addressId);
    if (!address) {
      return next(ApiError.resourceNotFound("Address not found."));
    }
    const updatedAddress = await addressService.updateAddress(
      addressId,
      updateAddressData
    );
    res.json(updatedAddress);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addressId = req.params.addressId;
    const address = await addressService.findOne(addressId);
    if (!address) {
      next(ApiError.resourceNotFound("Address not found."));
      return;
    }
    await addressService.deleteAddress(addressId);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
