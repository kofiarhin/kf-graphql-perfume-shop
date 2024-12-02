export const typeDefs = `#graphql

 type Product {
    _id: ID
    name: String!,
    price: Float!,
    description: String!
    img: String!
 }


type Query {
    products: [Product ]
    product(id: ID) : Product
}

# inputs
input CreateProductInput {
    name: String!
    price: Float!
    description: String!
    img: String!
}

input UpdateProductInput {
    name: String
    price: Float
    description: String
    img: String
}
# mutations
type Mutation {
    createProduct(createProductInput: CreateProductInput): Product
    deleteProduct(id: ID!) : Product
    updateProduct(id: ID!, updateProductInput: UpdateProductInput): Product
}
`;
