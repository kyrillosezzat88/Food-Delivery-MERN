import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actAddCategory = createAsyncThunk(
  "category/actAddCategory",
  async (
    categoryData: { name: string; isActive?: boolean; ImageUrl?: string },
    thunkAPI,
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const addCategory = await axios.post("categories", categoryData);
      return addCategory.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export default actAddCategory;
