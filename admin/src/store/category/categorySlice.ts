import { createSlice } from "@reduxjs/toolkit";
import type { TCategory, TLoading } from "@types";
import actGetCategories from "./actions/actGetCategories";
import actAddCategory from "./actions/actAddCategory";

type TCategories = {
  TotalPages: number;
  TotalRecords: number;
  currentPage: number;
  data: TCategory[];
};

type TInitialState = {
  categories: TCategories;
  loading: TLoading;
  error: string | null;
};
const initialState: TInitialState = {
  categories: {
    TotalPages: 0,
    TotalRecords: 0,
    currentPage: 0,
    data: [],
  },
  loading: "idle",
  error: null,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.categories = initialState.categories;
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.categories = action.payload;
      state.error = null;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.categories = initialState.categories;
      state.error = action.error.message || "Failed to fetch categories";
    });
    // add category
    builder.addCase(actAddCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAddCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.categories.data = [
        action.payload.category,
        ...state.categories.data,
      ];
      state.categories.TotalRecords += 1;
      state.error = null;
    });
    builder.addCase(actAddCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "Failed to add category";
    });
  },
});

export { actGetCategories, actAddCategory };

export default categorySlice.reducer;
