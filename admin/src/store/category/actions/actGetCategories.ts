import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetCategories = createAsyncThunk(
  "category/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const getCategories = await axios.get("categories");
      return getCategories.data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);

export default actGetCategories;
