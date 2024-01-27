import mongoose, { Schema } from "mongoose";
//
const permissionSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: String,
});

export const Permission = mongoose.model("Permission", permissionSchema);
