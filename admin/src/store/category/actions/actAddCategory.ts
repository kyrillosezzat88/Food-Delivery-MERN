import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TAddCategoryResponse = {
  category: TCategory;
  message: string;
};

const actAddCategory = createAsyncThunk(
  "category/actAddCategory",
  async (categoryData: TCategory, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("image", categoryData.image);

    try {
      const addCategory = await axios.post<TAddCategoryResponse>(
        "categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return addCategory.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);
export default actAddCategory;
