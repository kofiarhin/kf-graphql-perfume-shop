import Product from "../model/productModel.js";
import services from "../services/services.js";
import { GraphQLError } from "graphql";
import { generateToken } from "../helper/utility.js";

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
    // get product
    product: async (_, args) => {
      const { id } = args;
      const product = await services.getProduct(id);

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
    // register User
    registerUser: async (_, args) => {
      const user = await services.registerUser(args.registerUserInput);
      if (user.error) {
        throw new GraphQLError("USER NOT CREATED", {
          extensions: {
            code: user.error,
          },
        });
      }
      return user;
    },

    // loginUser
    loginUser: async (_, args) => {
      const user = await services.loginUser(args.loginUserInput);
      if (user.error) {
        throw new GraphQLError("NOT AUTHORIZED", {
          extensions: {
            code: user.error,
          },
        });
      }
      return user;
    },
    // create product
    createProduct: async (_, args) => {
      const product = await services.createProduct(args.createProductInput);
      return product;
    },
    // delete product
    deleteProduct: async (_, args) => {
      const product = await services.deleteProduct(args.id);
      return product;
    },

    // updaste product
    updateProduct: async (_, args) => {
      const { id, updateProductInput } = args;
      const updatedProduct = await services.updateProduct(
        id,
        updateProductInput
      );
      if (updatedProduct.error) {
        throw new GraphQLError("PRODUCT NOT UPDATED", {
          extensions: {
            code: "there was a problem updating product",
          },
        });
      }
      return updatedProduct;
    },
  },
};

export default resolvers;
