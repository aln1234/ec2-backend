import mongoose from "mongoose";
//
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  country: { type: String },
  city: { type: String },
  street: { type: String },
  zipCode: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Address = mongoose.model("Address", AddressSchema);
