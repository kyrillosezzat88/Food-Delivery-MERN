import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TUser } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actLogin = createAsyncThunk(
  "auth/login",
  async (user: TUser, { rejectWithValue }) => {
    try {
      console.log("Logging in user:", user);
      const response = await axios.post("auth/login", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actLogin;
