import { ErrorMessage, Loading } from "@components/common";
import {
  DeliveryInfo,
  OrderActions,
  OrderInfo,
  OrderSummary,
} from "@components/order";
import useOrderDetails from "@hooks/useOrderDetails";

const CompletedOrder = () => {
  const {
    recentOrder,
    error,
    subtotal,
    deliveryCost,
    total,
    isPending,
    isFailed,
    hasError,
  } = useOrderDetails();

  if (isPending) {
    return <Loading message="Loading order details..." />;
  }

  if (!recentOrder || isFailed || hasError) {
    return (
      <ErrorMessage
        title={error ? "Failed to load order" : "Order not found"}
        message={
          error
            ? error
            : "We couldn't find an order with this ID. Please check the link or try again."
        }
        actionLink="/"
        actionLabel="Back to menu"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Success Hero */}
        <OrderInfo recentOrder={recentOrder} />

        {/* Order Items */}
        <OrderSummary
          recentOrder={recentOrder}
          subtotal={subtotal}
          deliveryCost={deliveryCost}
          total={total}
        />

        {/* Delivery Info */}
        <DeliveryInfo recentOrder={recentOrder} />

        {/* Actions */}
        <OrderActions />
      </div>
    </div>
  );
};

export default CompletedOrder;
