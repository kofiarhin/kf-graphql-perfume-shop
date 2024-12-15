import User from "../model/userModel.js";
import services from "../services/services.js";
import Product from "../model/productModel.js";
import data from "../data.js";

// create users
const createUsers = async (usersData) => {
  await User.deleteMany();
  await Promise.all(
    usersData.map(async (user) => {
      await services.registerUser(user);
    })
  );
  console.log("users created");
};

// create products
const createProducts = async (productsData) => {
  await Product.deleteMany();
  await Promise.all(
    productsData.map(async (product) => {
      services.createProduct(product);
    })
  );
  console.log("products created");
};

// reset
const reset = async () => {
  // clears users
  await createUsers(data.users);

  // clear products
  await createProducts(data.products);
};

export default reset;
