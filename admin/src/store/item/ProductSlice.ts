import { createSlice } from "@reduxjs/toolkit";
import type { TProduct, TLoading } from "@types";
import actGetProducts from "./actions/actGetProducts";
import actAddProduct from "./actions/actAddProduct";

type TInitState = {
  products: TProduct[];
  loading: TLoading;
  error: string | null;
};

const initialState: TInitState = {
  products: [],
  loading: "idle",
  error: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    //add item
    builder.addCase(actAddProduct.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAddProduct.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products = [action.payload, ...state.products];
      state.error = null;
    });
    builder.addCase(actAddProduct.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});
export { actAddProduct, actGetProducts };
export default productSlice.reducer;
