import bcrypt from "bcryptjs";
import services from "./services/services.js";
import connectDB from "./config/db.js";
import User from "./model/userModel.js";
import data from "./data.js";
import authServices from "./services/authServices.js";
import Product from "./model/productModel.js";
import productServices from "./services/productServices.js";
import cartServices from "./services/cartServices.js";
import Cart from "./model/cartModel.js";

const testUser = {
  name: "test",
  email: "test@gmail.com",
  password: "password",
};

const clearDB = async () => {
  await User.deleteMany();
  await Product.deleteMany();
  await Cart.deleteMany();
  console.log("database cleared");
};

const loginUser = async (userData) => {
  //login user
  const isAuth = await authServices.loginUser(userData);
  return isAuth;
};

// register user
const registerUser = async (userData) => {
  const newUser = await authServices.registerUser(userData);
  console.log("user registered successfully");
};

const createProduct = async (data) => {
  const product = await productServices.createProduct(data);
  return product;
};

const createCart = async (user, product) => {
  const { _id: user_id } = user;
  const { _id: product_id } = product;

  //   create cart
  const cartData = {
    user_id,
    cartItems: [{ product_id, quantity: 1 }],
  };
  const newCart = await cartServices.createCart(cartData);
  return newCart;
};

const updateCart = async (userData, product) => {
  //  check if cart already esist
  const cart = await cartServices.getCart();
  const checkCart = await cartServices.getCart(userData._id);
  if (checkCart) {
    const updatedCart = await cartServices.updateCart({
      user_id: userData._id,
      cartItems: [{ product_id: product._id, quantity: 5 }],
    });

    const newCartUpdate = await cartServices.getCart(userData._id);
    console.log(newCartUpdate);
  }
};

// run test
const run = async () => {
  // connect to database
  connectDB();

  await clearDB();
  //   register user
  const newUser = await registerUser(testUser);

  //   test for login success
  const loggedInUser = await loginUser(testUser);

  //   check when user login with wrong email
  const wrongEmail = await loginUser({
    email: "some email",
    password: "password",
  });
  if (wrongEmail.error === "user not found") {
    console.log({ success: "wrong email test sucess" });
  }

  //  test with right email but wrong password
  const wrongPassword = await loginUser({
    email: testUser.email,
    password: "wrong password",
  });

  if (wrongPassword.error === "check credentials and try again") {
    console.log({ success: "wrong password success" });
  }

  // test create new product
  const product = data.products[0];
  const newProduct = await createProduct(product);

  if (product.name === newProduct.name) {
    console.log({ success: "product created successfully" });
  }

  // test for creating cart
  await createCart(loggedInUser, newProduct);

  // update cart
  const cart = await Cart.findOne({ user_id: loggedInUser._id });

  //  create new product
  const productTwoData = data.products[1];
  const productTwo = await createProduct(productTwoData);

  //   update cart
  const cartUpdate = await updateCart(loggedInUser, productTwo);
};

run();
