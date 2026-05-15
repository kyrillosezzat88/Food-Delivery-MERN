import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TUser } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actRegister = createAsyncThunk(
  "auth/register",
  async (user: TUser, { rejectWithValue }) => {
    try {
      const newUser = await axios.post("auth/register", user);
      return newUser.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actRegister;
