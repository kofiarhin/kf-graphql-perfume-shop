import { generateToken } from "../helper/utility.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

const testProduct = {
  name: "test",
  price: 100,
  description: "some description",
  img: "some url",
};

const testUser = {
  _id: "12343242",
  name: "kofi arhin",
  email: "kofiarhin@gmail.com",
  password: "password",
};
const createProduct = async (data) => {
  const product = await Product.create({
    ...data,
  });
  return product;
};

const getProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return { error: "product not found" };
    }
    return product;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    return product;
  } catch (error) {
    return { error: "product was not deleted" };
  }
};

const updateProduct = async (id, data) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );
  if (!updatedProduct) {
    return { error: "there was a problem updating product" };
  }
  return updatedProduct;
};

const registerUser = async (userData) => {
  try {
    const { password, ...rest } = userData;
    // hashPassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      ...rest,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    if (error.code && error.code === 11000) {
      return { error: "email already taken" };
    }
    return { error: "there waqs a problem creating user" };
  }
};

// login User
const loginUser = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await User.findOne({ email });

    if (!user) {
      return { error: "user not found" };
    }
    //  compare passsword
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return { error: "invalid credentials" };
    }
    // genearate token
    const token = generateToken(user._id);
    const { password: userPassword, ...rest } = user._doc;
    return {
      ...rest,
      token,
    };
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export default {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  testProduct,
  testUser,
  registerUser,
  loginUser,
};
