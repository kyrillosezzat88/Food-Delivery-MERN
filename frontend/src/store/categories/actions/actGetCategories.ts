import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
import type { TPaginatedResponse } from "src/types/paginatedResponse.type";

export const actGetCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await axios.get<TPaginatedResponse<TCategory>>("/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);
