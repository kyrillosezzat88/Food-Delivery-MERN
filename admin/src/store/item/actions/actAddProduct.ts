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
    console.log({ product });
    const formData = new FormData();
    for (let key in product) {
      if (key === "gallery") {
        for (let img of product.gallery) {
          formData.append("gallery", img);
        }
      } else {
        formData.append(key, product[key]);
      }
    }
    try {
      const res = await axios.post<TResponse>("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actAddProduct;
