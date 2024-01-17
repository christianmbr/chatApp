import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const User = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

User.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, await bcrypt.genSalt(10));
};

User.statics.comparePassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};

export default model("user", User);
