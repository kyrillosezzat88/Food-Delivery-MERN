import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGetOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGetOrderDetails;
