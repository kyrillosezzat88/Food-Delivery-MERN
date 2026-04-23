import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGoogleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (token: string, { rejectWithValue }) => {
    try {
      // Set the token in axios headers for the request
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("auth/me");
      // Remove the temporary header
      delete axios.defaults.headers.common["Authorization"];
      return {
        user: response.data.user,
        token,
      };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGoogleLogin;
