import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@types";
import axios from "axios";

type TAddCategoryResponse = {
  category: TCategory;
  message: string;
};

const actAddCategory = createAsyncThunk(
  "category/actAddCategory",
  async (
    categoryData: { name: string; isActive?: boolean; ImageUrl?: string },
    thunkAPI,
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const addCategory = await axios.post<TAddCategoryResponse>(
        "categories",
        categoryData,
      );
      return addCategory.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export default actAddCategory;
