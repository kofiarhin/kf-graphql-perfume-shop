import { generateToken } from "../helper/utility.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
const loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  if (!user) {
    return { error: "user not found" };
  }

  //   check password
  const isAuth = await bcrypt.compare(password, user.password);
  if (!isAuth) {
    return { error: "check credentials and try again" };
  }

  //  generate token
  const token = generateToken(user._id);
  const { password: userPassword, ...rest } = user._doc;
  return { ...rest, token };
};

const registerUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const { password, ...rest } = userData;

  const newUser = await User.create({
    ...rest,
    password: hashedPassword,
  });

  return newUser;
};

const getUsers = async () => {
  return await User.find();
};

export default { loginUser, registerUser, getUsers };
