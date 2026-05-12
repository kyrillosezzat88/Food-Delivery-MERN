import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TOrder } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData: TOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post("/orders", orderData);
      console.log("Order placed successfully:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actPlaceOrder;
