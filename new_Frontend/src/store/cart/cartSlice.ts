import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@types";
import type { TProduct } from "src/types/product.type";

type TInitialState = {
  items: { [key: string]: number };
  itemsFullData: TProduct[];
  loading: TLoading;
  error: string | null;
};

const initialState: TInitialState = {
  items: {},
  itemsFullData: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart or increment if already in cart
    addToCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items[id];
      if (existingItem) {
        state.items[id] = existingItem + 1;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.itemsFullData = state.itemsFullData.filter(
        (item) => item._id !== id,
      );
    },
    decrement: (state, action) => {
      const id = action.payload;
      const existingItem = state.items[id];
      if (existingItem && existingItem > 1) {
        state.items[id] = existingItem - 1;
      } else {
        delete state.items[id];
        state.itemsFullData = state.itemsFullData.filter(
          (item) => item._id !== id,
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, decrement } = cartSlice.actions;
export default cartSlice.reducer;
