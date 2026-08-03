import { createSlice } from "@reduxjs/toolkit";
import type { TLoading, TOrder } from "@types";
import actPlaceOrder from "./actions/actPlaceOrder";
import actGetOrderDetails from "./actions/actGetOrderDetails";
import actGetUserOrders from "./actions/getUserOrders";

type TInitState = {
  orders: TOrder[];
  recentOrder: TOrder | null;
  loading: TLoading;
  error: string | null;
};

const initialState: TInitState = {
  orders: [],
  recentOrder: null,
  loading: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orders.push(action.payload);
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    //get order details by id
    builder.addCase(actGetOrderDetails.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrderDetails.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.recentOrder = action.payload;
      state.error = null;
    });
    builder.addCase(actGetOrderDetails.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    //user orders
    builder.addCase(actGetUserOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetUserOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orders = action.payload;
      state.error = null;
    });
    builder.addCase(actGetUserOrders.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export { actPlaceOrder, actGetOrderDetails, actGetUserOrders };
export default orderSlice.reducer;
