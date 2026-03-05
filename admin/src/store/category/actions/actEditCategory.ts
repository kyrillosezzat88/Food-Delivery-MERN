import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";

const actEditCategory = createAsyncThunk(
  "category/actEditCategory",
  async (category: TCategory, { rejectWithValue }) => {
    try {
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);
