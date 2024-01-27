import mongoose, { Types } from "mongoose";

//model

//type
import { TAddress, TAddressSchema } from "../types/address";
import { Address } from "../models/Address";

async function findAll() {
  return await Address.find().lean().exec();
}

async function findOne(addressId: string | Types.ObjectId) {
  const category = await Address.findById(addressId);
  return category;
}

async function createOne(address: TAddressSchema) {
  const newCategory = new Address(address);
  return await newCategory.save();
}

async function updateAddress(
  addressId: string | Types.ObjectId,
  address: TAddressSchema
) {
  const updatedAddress = await Address.findByIdAndUpdate(addressId, address, {
    new: true,
  });
  return updatedAddress;
}

async function deleteAddress(addressId: string | Types.ObjectId) {
  const address = await Address.findByIdAndDelete(addressId);
  return address;
}

export default {
  findOne,
  findAll,
  createOne,
  updateAddress,
  deleteAddress,
};
