import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/shcema.js";
import resolvers from "./graphql/resolvers.js";
import connectDB from "./config/db.js";

// connect database
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 5000;

const { url } = await startStandaloneServer(server, {
  listen: {
    port,
  },
});

console.log(`server started on port ${port}`);
