import User from "./schema/userSchema.js";

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

export default { register };
