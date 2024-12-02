import Product from "../model/productModel.js";

const testProduct = {
  name: "test",
  price: 100,
  description: "some description",
  img: "some url",
};
export const createProduct = async (data) => {
  const product = await Product.create({
    ...data,
  });
  console.log("xxxx", product);
  return product;
};

export const getProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    return { error: error.message };
  }
};

export const removeProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    return product;
  } catch (error) {
    return { error: "product was not deleted" };
  }
};

export const updateProductItem = async (id, data) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );
  return updatedProduct;
};
