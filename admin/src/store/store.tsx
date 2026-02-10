import { configureStore } from "@reduxjs/toolkit";
import categories from "./category/categorySlice";
import user from "./auth/authSlice";
import products from "./item/ProductSlice";

const store = configureStore({
  reducer: {
    categories,
    products,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
