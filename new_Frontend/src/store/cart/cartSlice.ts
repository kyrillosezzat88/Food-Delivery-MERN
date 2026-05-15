import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@types";
import type { TProduct } from "src/types/product.type";
import { actGetFullProductDetails } from "./actions/actGetFullProductDetails";

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
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.itemsFullData = state.itemsFullData.filter(
        (item) => item._id !== id,
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
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
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = {};
      state.itemsFullData = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetFullProductDetails.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetFullProductDetails.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.itemsFullData = action.payload;
    });
    builder.addCase(actGetFullProductDetails.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export { actGetFullProductDetails };
export const { addToCart, removeFromCart, decrement, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
