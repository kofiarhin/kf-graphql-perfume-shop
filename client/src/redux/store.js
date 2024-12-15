import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});

export default store;
