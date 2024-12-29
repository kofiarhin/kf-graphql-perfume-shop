import Product from "../model/productModel.js";

const createProduct = async (data) => {
  const newProduct = await Product.create(data);
  return newProduct;
};

const getProduct = async (product_id) => {
  console.log(product_id);
};

const getProducts = async () => {
  return await Product.find();
};

export default { createProduct, getProduct, getProducts };
