import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "./graphql/queries/productQuery";
const App = () => {
  const { error, loading, data } = useQuery(GET_PRODUCTS);
  console.log(data);
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default App;
