import User from "./schema/userSchema.js";
import jwt from "jsonwebtoken";

async function register(name, password) {
  const hashPassword = await User.hashPassword(password);
  try {
    const newUser = await new User({
      name,
      password: hashPassword,
    }).save();
    return newUser;
  } catch (error) {
    // console.error(error.message);
    return error.code;
  }
}

async function login(name, password) {
  try {
    const userFound = await User.findOne({ name: name });
    const iPasswordCorrect = await User.comparePassword(
      password,
      userFound.password
    );

    return iPasswordCorrect ? userFound : 0;
  } catch (err) {
    console.error(err.message);
  }
}

export default { register, login };
