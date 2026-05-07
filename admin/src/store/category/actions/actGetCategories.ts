import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@types";
import axios from "axios";
import type { TPaginatedResponse } from "src/types/paginatedResponse.type";

const actGetCategories = createAsyncThunk(
  "category/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const getCategories =
        await axios.get<TPaginatedResponse<TCategory>>("categories");
      return getCategories.data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);

export default actGetCategories;
