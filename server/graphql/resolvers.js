import Product from "../model/productModel.js";
import {
  createProduct,
  getProduct,
  removeProduct,
  updateProductItem,
} from "../services/utility.js";
import { GraphQLError } from "graphql";

const testProduct = {
  name: "test",
  price: 100,
  description: "some description",
  img: "some url",
};
const resolvers = {
  Query: {
    products: async () => {
      const products = await Product.find();
      return products;
    },
    product: async (_, args) => {
      const { id } = args;
      const product = await getProduct(id);
      if (product.error) {
        throw new GraphQLError("PRODUCT NOT FOUND", {
          extensions: {
            code: product.error,
          },
        });
      }
      return product;
    },
  },
  Mutation: {
    createProduct: async (_, args) => {
      const product = await createProduct(args.createProductInput);
      return product;
    },
    deleteProduct: async (_, args) => {
      const product = await removeProduct(args.id);
      return product;
    },
    updateProduct: async (_, args) => {
      const { id, updateProductInput } = args;
      console.log(id, updateProductInput);
      const updatedProduct = await updateProductItem(id, updateProductInput);
      return updatedProduct;
    },
  },
};

export default resolvers;
