import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./pages/cart/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
