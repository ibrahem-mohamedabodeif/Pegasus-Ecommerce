import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (!item) {
        state.push(action.payload);
      } else {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
      }
    },
    deleteItem(state, action) {
      const item = state.findIndex((item) => item.id === action.payload);
      state.splice(item, 1);
    },
    increaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);

      item.quantity++;
      item.totalPrice = item.price * item.quantity;
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);

      item.quantity--;
      item.totalPrice = item.price * item.quantity;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart() {
      return [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
