import { createSlice } from "@reduxjs/toolkit";
import type { TUser, TLoading } from "@types";
import actLogin from "./actions/actLogin";
import actRegister from "./actions/actRegister";
import actGoogleLogin from "./actions/actGoogleLogin";
import actUpdateUser from "./actions/actUpdateUser";

type TInitState = {
  user: TUser | null;
  token: string | null;
  loading: TLoading;
  error: string | null;
};
const initialState: TInitState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: "idle",
  error: null as string | null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.user = null;
      state.error = action.payload as string;
    });
    builder.addCase(actRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.user = action.payload.user;
    });
    builder.addCase(actRegister.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(actGoogleLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGoogleLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(actGoogleLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.user = null;
      state.error = action.payload as string;
    });
    builder.addCase(actUpdateUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actUpdateUser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(actUpdateUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export { actLogin, actRegister, actGoogleLogin, actUpdateUser };
export default authSlice.reducer;
