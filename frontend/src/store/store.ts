import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import cart from "./cart/cartSlice";
import type { TLoading } from "@types";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import orders from "./orders/orderSlice";

const loadUserFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const store = configureStore({
  reducer: {
    auth,
    cart,
    categories,
    products,
    orders,
  },
  preloadedState: {
    auth: {
      user: loadUserFromLocalStorage(),
      token: localStorage.getItem("token") || null,
      loading: "idle" as TLoading,
      error: null,
    },
    cart: {
      items: loadItemsFromLocalStorage(),
      itemsFullData: [],
      loading: "idle" as TLoading,
      error: null,
    },
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
