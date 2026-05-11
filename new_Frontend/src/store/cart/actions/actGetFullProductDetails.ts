import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
import type { TProduct } from "@types";

export const actGetFullProductDetails = createAsyncThunk(
  "cart/getFullProductDetails",
  async (productIds: { [key: string]: number }, { rejectWithValue }) => {
    try {
      if (!Object.keys(productIds).length) return [] as TProduct[];
      const response = await Promise.all(
        Object.keys(productIds).map((id) =>
          axios
            .get<{ product: TProduct }>(`/products/${id}`)
            .then((res) => res.data.product),
        ),
      );
      return response;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);
