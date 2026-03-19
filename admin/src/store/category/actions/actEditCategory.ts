import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actEditCategory = createAsyncThunk(
  "category/actEditCategory",
  async (categoryData: TCategory, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("image", categoryData.image);
      formData.append("active", categoryData.active ?? false);
      const newCategory = await axios.put(
        `/categories/${categoryData._id}`,
        formData,
      );
      return newCategory.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actEditCategory;
