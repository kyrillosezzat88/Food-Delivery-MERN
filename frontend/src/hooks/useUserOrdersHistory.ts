import type { TOrder } from "@types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetUserOrders from "@store/orders/actions/getUserOrders";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type OrderStatus = "delivered" | "preparing" | "on the way" | "cancelled";

const statusStyle: Record<OrderStatus, string> = {
  delivered: "bg-green-50 text-green-600",
  preparing: "bg-amber-50 text-amber-600",
  "on the way": "bg-blue-50 text-blue-600",
  cancelled: "bg-red-50 text-red-400",
};

const normalizeStatus = (status?: string): OrderStatus => {
  const normalized = status?.toLowerCase() ?? "";
  if (normalized.includes("delivered")) return "delivered";
  if (normalized.includes("preparing")) return "preparing";
  if (normalized.includes("on the way") || normalized.includes("shipped"))
    return "on the way";
  if (normalized.includes("cancelled")) return "cancelled";
  return "preparing";
};

const useUserOrdersHistory = () => {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, orders } = useAppSelector((state) => state.orders);
  const { user } = useAppSelector((state) => state.auth);
  const filters: (OrderStatus | "all")[] = [
    "all",
    "delivered",
    "preparing",
    "on the way",
    "cancelled",
  ];

  const orderList: TOrder[] = Array.isArray(orders) ? orders : [];
  const filteredOrders = orderList.filter((order) => {
    const normalizedStatus = normalizeStatus(order.status);
    return filter === "all" || normalizedStatus === filter;
  });

  useEffect(() => {
    // Fetch user orders when the component mounts
    if (user?._id) {
      dispatch(actGetUserOrders(user._id));
    }
  }, [dispatch, user?._id]);
  return {
    filter,
    setFilter,
    navigate,
    loading,
    error,
    filteredOrders,
    filters,
    statusStyle,
    normalizeStatus,
  };
};

export default useUserOrdersHistory;
