import { createSlice } from "@reduxjs/toolkit";
import type { TProduct, TLoading } from "@types";
import actGetProducts from "./actions/actGetProducts";
import actAddProduct from "./actions/actAddProduct";
import actDeleteProduct from "./actions/actDeleteProduct";
import actEditProduct from "./actions/actEditProduct";
import actDeleteCategory from "@store/category/actions/actDeleteCategory";

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
      state.products = action.payload.data;
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
    //delete item
    builder.addCase(actDeleteProduct.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actDeleteProduct.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload?._id) {
        state.products = state.products.filter(
          (pro) => pro._id !== action.payload?._id,
        );
        state.error = null;
      } else {
        state.error = "unexpected error";
      }
    });
    builder.addCase(actDeleteProduct.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    //edit item
    builder.addCase(actEditProduct.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actEditProduct.fulfilled, (state, action) => {
      state.loading = "succeeded";
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id,
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.error = null;
    });
    builder.addCase(actEditProduct.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    // delete products when category deleted
    builder.addCase(actDeleteCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actDeleteCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products = state.products.filter(
        (pro) => pro.category !== action.payload.category._id,
      );
      state.error = null;
    });
  },
});
export { actAddProduct, actGetProducts, actDeleteProduct, actEditProduct };
export default productSlice.reducer;
