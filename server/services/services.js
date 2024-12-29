import { generateToken } from "../helper/utility.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import Cart from "../model/cartModel.js";

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

const getProducts = async () => {
  return await Product.find();
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

// users
const getUsers = async () => {
  return await User.find();
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

// generate randomIndex
const randomIndex = (data) => {
  return Math.floor(Math.random() * data.length);
};
// generate random data
const generateRandomData = async () => {
  const products = await getProducts();
  const randomProducttIndex = randomIndex(products);
  const { _id: product_id } = products[randomProducttIndex];

  // generate random user
  const users = await User.find();
  const randomUserIndex = randomIndex(users);
  const { _id: user_id } = users[randomUserIndex];

  // generate randomQuantity
  const randomQuantity = Math.floor(Math.random() * 20);

  return {
    user_id,
    cartItems: [{ product_id, quantity: randomQuantity }],
  };
};
const createCart = async (cartData) => {
  // await Cart.deleteMany();
  // check if user already has cart
  const checkUserCart = await Cart.findOne({ user_id: cartData.user_id });
  if (!checkUserCart) {
    const cart = await Cart.create(cartData);
    console.log("xxxx", cart);
    return cart;
  }

  // update cart
  const { _id } = checkUserCart;
  const updatedCart = await Cart.findByIdAndUpdate(
    _id,
    {
      $push: {
        cartItems: { $each: cartData.cartItems },
      },
    },
    { new: true }
  );
  console.log("xxxx", updatedCart);
};

const getAllCart = async () => {
  return Cart.find();
};

const getCart = async (user_id) => {
  return Cart.findOne({ user_id });
};

const removeCartItem = async (user_id, product_id) => {
  // check if user cart exist
  const checkCartExist = await getCart(user_id);
  if (checkCartExist) {
    // update cart
    const updatedCart = await Cart.updateOne(
      { user_id },
      {
        $pull: {
          cartItems: { product_id },
        },
      },
      { new: true }
    );
  }

  console.log("cart does not exist");
};

// const run = async () => {
//   const cart = await getCart("675e53afa23c479d5113f0be");
//   await removeCartItem("675e53b0a23c479d5113f0c4", "675e53b0a23c479d5113f0c4");
//   console.log(cart);
// };

// run();

export default {
  createProduct,
  getProduct,
  getProducts,
  getUsers,
  updateProduct,
  deleteProduct,
  testProduct,
  testUser,
  registerUser,
  loginUser,
  getAllCart,
  getCart,
};
