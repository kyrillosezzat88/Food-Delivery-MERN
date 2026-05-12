import { createSlice } from "@reduxjs/toolkit";
import type { TLoading, TOrder } from "@types";
import actPlaceOrder from "./actions/actPlaceOrder";

type TInitState = {
  orders: TOrder[];
  loading: TLoading;
  error: string | null;
};

const initialState: TInitState = {
  orders: [],
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
  },
});

export { actPlaceOrder };
export default orderSlice.reducer;
