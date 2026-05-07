import { createSlice } from "@reduxjs/toolkit";
import type { TLoading, TProduct } from "@types";
import type { TPaginatedResponse } from "src/types/paginatedResponse.type";
import { actGetProducts } from "./actions/actGetProducts";

type TInitialState = {
  data: TPaginatedResponse<TProduct> | null;
  loading: TLoading;
  error: string | null;
};

const initialState: TInitialState = {
  data: null,
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
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
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export { actGetProducts };
export default productsSlice.reducer;
