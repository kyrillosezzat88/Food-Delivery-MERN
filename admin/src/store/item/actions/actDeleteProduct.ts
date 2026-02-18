import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = {
  message: string;
  product: TProduct;
  status: number;
};

const actDeleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const deletedProduct = await axios.delete<TResponse>(`products/${id}`);
      if (deletedProduct) {
        return deletedProduct.data.product;
      }
      return null;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actDeleteProduct;
