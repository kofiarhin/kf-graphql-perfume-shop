import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const GRAPHQL_ENDPOINT = "http://localhost:5000";

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve token from localStorage (or other secure storage method)
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;
  // Add the Authorization header to the request if the token is available
  operation.setContext({
    headers: {
      Authorization: token ? token : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(
    new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    })
  ),
  cache: new InMemoryCache(),
});

export default client;

// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "http://localhost:5000",
//   cache: new InMemoryCache(),
// });

// export default client;
