import { Link } from "react-router-dom";
import { ErrorMessage, Loading } from "@components/common";
import { DeliveryInfo, OrderSummary, OrderTracking } from "@components/order";
import useOrderDetails from "@hooks/useOrderDetails";

const TrackOrder = () => {
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
    return <Loading message="Loading tracking details..." />;
  }

  if (!recentOrder || isFailed || hasError) {
    return (
      <ErrorMessage
        title={error ? "Unable to load order" : "Order not found"}
        message={
          error
            ? error
            : "We couldn’t find the order you are trying to track. Please verify your order ID or return to the menu."
        }
        actionLink="/"
        actionLabel="Back to menu"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="mx-auto max-w-5xl flex flex-col gap-8">
        <div className="rounded-4xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Track your order
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-gray-900">
                Your delivery is moving fast
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                We’re tracking every step so you know when your order will
                arrive.
              </p>
            </div>

            <div className="rounded-3xl bg-primary/5 px-5 py-4 text-sm text-gray-700">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Order ID
              </p>
              <p className="mt-2 font-semibold text-gray-900">
                {recentOrder.orderID}
              </p>
              <p className="mt-1 text-gray-500">
                Placed
                {recentOrder.createdAt
                  ? new Date(recentOrder.createdAt).toLocaleDateString()
                  : "Date unavailable"}
              </p>
            </div>
          </div>
        </div>

        <OrderTracking orderStatus={recentOrder.status} />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <DeliveryInfo recentOrder={recentOrder} />
          <OrderSummary
            recentOrder={recentOrder}
            subtotal={subtotal}
            deliveryCost={deliveryCost}
            total={total}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Back to menu
          </Link>
          <Link
            to="/profile"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-gray-200 text-white bg-primary px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-primary hover:bg-white hover:text-black"
          >
            View your orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
