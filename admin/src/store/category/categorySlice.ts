import { createSlice } from "@reduxjs/toolkit";
import type { TCategory, TLoading } from "@types";
import actGetCategories from "./actions/actGetCategories";
import actAddCategory from "./actions/actAddCategory";
import actDeleteCategory from "./actions/actDeleteCategory";
import actEditCategory from "./actions/actEditCategory";
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.data = initialState.data;
      state.error = null;
    });

    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Failed to fetch categories";
    });

    // add category
    builder.addCase(actAddCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actAddCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (state.data) {
        state.data.data = [action.payload.category, ...state.data.data];
        state.data.TotalRecords = state.data.TotalRecords + 1;
      }
      state.error = null;
    });

    builder.addCase(actAddCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Failed to add category";
    });

    //delete category
    builder.addCase(actDeleteCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actDeleteCategory.fulfilled, (state, action) => {
      const categoryId = action.payload.category._id;

      state.loading = "succeeded";
      state.error = null;
      if (state.data) {
        state.data.data = state.data.data.filter(
          (cat) => cat._id !== categoryId,
        );
        state.data.TotalRecords = state.data.TotalRecords - 1;
      }
    });
    builder.addCase(actDeleteCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Failed to delete category";
    });
    builder.addCase(actEditCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actEditCategory.fulfilled, (state, action) => {
      const categoryID = action.payload.category._id;
      state.loading = "succeeded";
      state.error = null;
      if (state.data) {
        state.data.data = state.data.data.map((cat) =>
          cat._id === categoryID ? action.payload.category : cat,
        );
      }
    });

    builder.addCase(actEditCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Failed to edit category";
    });
  },
});

export { actGetCategories, actAddCategory, actDeleteCategory, actEditCategory };

export default categorySlice.reducer;
