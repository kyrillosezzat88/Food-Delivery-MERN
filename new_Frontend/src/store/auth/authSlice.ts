import { createSlice } from "@reduxjs/toolkit";
import type { TUser, TLoading } from "@types";
import actLogin from "./actions/actLogin";
import actRegister from "./actions/actRegister";

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
  reducers: {},
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
  },
});

export { actLogin, actRegister };
export default authSlice.reducer;
