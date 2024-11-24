export const typeDefs = `#graphql

 type Product {
    name: String,
    price: Float,
    description: String
 }


type Query {
    products: [Product ]
}
`;
