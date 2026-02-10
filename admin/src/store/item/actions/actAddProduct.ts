import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
import type { TProduct } from "src/types/product.types";

type TResponse = {
  message: string;
  product: TProduct;
};

const actAddProduct = createAsyncThunk(
  "products/addProduct",
  async (product: TProduct, { rejectWithValue }) => {
    try {
      const newItem = await axios.post<TResponse>("/products", product);
      console.log("New product added:", newItem);
      return newItem.data.product;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actAddProduct;
