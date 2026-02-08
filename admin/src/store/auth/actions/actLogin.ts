import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actLogin = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const user = await axios.post("auth/login", data);
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("user", JSON.stringify(user.data.user));
      return user.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actLogin;
