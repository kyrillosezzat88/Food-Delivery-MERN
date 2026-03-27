import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actEditProduct = createAsyncThunk(
  "/products/actEditProduct",
  async (product: TProduct, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      if (product.name) formData.append("name", product.name);
      if (product.description)
        formData.append("description", product.description);
      if (product.price != null) formData.append("price", `${product.price}`);
      if (product.count != null) formData.append("count", `${product.count}`);
      if (product.active != null)
        formData.append("active", `${product.active}`);

      if (product.category) {
        formData.append(
          "category",
          typeof product.category === "string"
            ? product.category
            : product.category._id,
        );
      }

      // Handle mainImage
      if (product.mainImage) {
        if (typeof product.mainImage === "string") {
          formData.append("mainImage", product.mainImage);
        } else if (product.mainImage instanceof File) {
          formData.append("mainImage", product.mainImage);
        }
      }

      // Handle gallery - separate strings from files
      const stringGallery: string[] = [];
      const fileGallery: File[] = [];

      product.gallery?.forEach((img) => {
        if (typeof img === "string") {
          stringGallery.push(img);
        } else if (img instanceof File) {
          fileGallery.push(img);
        }
      });

      if (stringGallery.length > 0) {
        formData.append("gallery", JSON.stringify(stringGallery));
      }

      fileGallery.forEach((img) => formData.append("gallery", img));

      const { data } = await axios.put(`/products/${product._id}`, formData);

      return data.product;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actEditProduct;
