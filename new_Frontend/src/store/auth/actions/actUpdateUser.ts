import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TUser } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actUpdateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData: TUser, { rejectWithValue }) => {
    try {
      const updatedUser = await axios.put(`/user/${userData._id}`, userData);
      console.log("Updated user response:", updatedUser.data);
      // update in localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const newUser = { ...parsedUser, ...updatedUser.data };
        localStorage.setItem("user", JSON.stringify(newUser));
      }
      return updatedUser.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actUpdateUser;
