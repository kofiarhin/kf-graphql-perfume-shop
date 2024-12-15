export const typeDefs = `#graphql

 type Product {
    _id: ID
    name: String!,
    price: Float!,
    description: String!
    img: String!
 }

type User {
    _id: ID!
    name: String!,
    email: String!
    password: String
    token: String
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

input RegisterUserInput { 
    name: String!
    email: String!
    password: String!
}

input LoginUserInput {
    email: String
    password: String
}
# mutations
type Mutation {
    registerUser(registerUserInput: RegisterUserInput): User
    loginUser(loginUserInput: LoginUserInput): User
    createProduct(createProductInput: CreateProductInput): Product
    deleteProduct(id: ID!) : Product
    updateProduct(id: ID!, updateProductInput: UpdateProductInput): Product
}
`;
