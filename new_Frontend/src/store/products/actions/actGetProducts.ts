import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
import type { TPaginatedResponse } from "src/types/paginatedResponse.type";

export const actGetProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await axios.get<TPaginatedResponse<TProduct>>("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);
