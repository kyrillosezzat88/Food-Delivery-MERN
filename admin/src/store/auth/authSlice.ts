import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import actLogin from "./actions/actLogin";
import type { TLoading } from "@types";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

type TUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  address: string;
  phoneNumber: string;
  createdAt: Date;
  profileImage?: string;
  orders: string[];
};

type TInitialState = {
  token: string | null;
  user: TUser | null;
  loading: TLoading;
  error: string | null;
};

const initialState: TInitialState = {
  token: token || null,
  user: user ? JSON.parse(user) : null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state) => {
      state.loading = "idle";
      state.error = null;
    });

    builder.addCase(
      actLogin.fulfilled,
      (state, action: PayloadAction<{ token: string; user: TUser }>) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = "succeeded";
        state.error = null;
      },
    );

    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
      state.token = null;
      state.user = null;
    });
  },
});

export { actLogin };
export default authSlice.reducer;
