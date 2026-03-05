import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = {
  message: string;
  status: number;
  category: TCategory;
};

const actDeleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const category = await axios.delete<TResponse>(`/categories/${id}`);
      return category.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actDeleteCategory;
