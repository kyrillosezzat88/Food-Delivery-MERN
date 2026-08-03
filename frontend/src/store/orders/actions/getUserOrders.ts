import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGetUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/orders/user/${userId}`);
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGetUserOrders;
