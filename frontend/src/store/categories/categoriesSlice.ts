import { createSlice } from "@reduxjs/toolkit";
import type { TCategory, TLoading } from "@types";
import { actGetCategories } from "./actions/actGetCategories";
import type { TPaginatedResponse } from "src/types/paginatedResponse.type";

type TInitialState = {
  data: TPaginatedResponse<TCategory> | null;
  loading: TLoading;
  error: string | null;
};

const initialState: TInitialState = {
  data: null,
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export { actGetCategories };
export default categoriesSlice.reducer;
