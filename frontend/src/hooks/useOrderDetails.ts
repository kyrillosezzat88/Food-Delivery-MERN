import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetOrderDetails from "@store/orders/actions/actGetOrderDetails";

const useOrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useAppDispatch();
  const { recentOrder, loading, error } = useAppSelector(
    (state) => state.orders,
  );

  useEffect(() => {
    if (!orderId) return;
    dispatch(actGetOrderDetails(orderId));
  }, [dispatch, orderId]);

  const subtotal = recentOrder?.subtotal ?? 0;
  const deliveryCost = recentOrder?.deliveryCost ?? 0;
  const total = recentOrder?.totalAmount ?? 0;

  const isPending = loading === "pending";
  const isFailed = loading === "failed";
  const hasError = !!error;

  return {
    recentOrder,
    error,
    subtotal,
    deliveryCost,
    total,
    isPending,
    isFailed,
    hasError,
  };
};

export default useOrderDetails;
