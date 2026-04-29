import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@types";
import type { TProduct } from "src/types/product.type";

type TInitialState = {
  items: TProduct[];
  loading: TLoading;
  error: string | null;
};

const initialState: TInitialState = {
  items: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id,
      );
      if (existingItem) {
        existingItem.count = (existingItem.count || 1) + 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
