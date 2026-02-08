import { configureStore } from "@reduxjs/toolkit";
import categories from "./category/categorySlice";
import user from "./auth/authSlice";

const store = configureStore({
  reducer: {
    categories,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
