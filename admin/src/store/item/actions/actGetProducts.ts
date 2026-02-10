import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TGetProductsResponse = {
  products: TProduct[];
  message: string;
};

const actGetProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const items = await axios.get<TGetProductsResponse>("/products");
      return items.data.products;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGetProducts;
