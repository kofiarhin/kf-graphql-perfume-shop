import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query ProductsQuery {
    products {
      _id
      name
      price
      description
    }
  }
`;

export { GET_PRODUCTS };
