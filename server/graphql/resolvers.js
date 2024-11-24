import Product from "../model/productModel.js";
const resolvers = {
  Query: {
    products: async () => {
      const products = await Product.find();
      return products;
    },
  },
};

export default resolvers;
