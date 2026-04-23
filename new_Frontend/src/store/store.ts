import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import type { TLoading } from "@types";

const loadUserFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const store = configureStore({
  reducer: {
    auth,
  },
  preloadedState: {
    auth: {
      user: loadUserFromLocalStorage(),
      token: localStorage.getItem("token") || null,
      loading: "idle" as TLoading,
      error: null,
    },
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
