import { Loading, ErrorMessage } from "@components/common";
import useUserOrdersHistory from "@hooks/useUserOrdersHistory";

const OrderHistory = () => {
  const {
    filter,
    setFilter,
    navigate,
    loading,
    error,
    filteredOrders,
    filters,
    statusStyle,
    normalizeStatus,
  } = useUserOrdersHistory();

  if (loading === "pending") {
    return <Loading message="Loading your orders..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load orders"
        message={error}
        actionLink="/"
        actionLabel="Back to menu"
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Order History</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Track and review your past orders
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex gap-2 flex-wrap border-b border-gray-100">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="divide-y divide-gray-100">
        {filteredOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400 text-sm">
            {filteredOrders.length === 0
              ? "No orders found"
              : "No orders match the selected filter."}
          </div>
        ) : (
          filteredOrders.map((order) => {
            const status = normalizeStatus(order.status);
            const productNames =
              order.products
                ?.map((item) => item.product?.name || "")
                .filter(Boolean)
                .join(", ") || "No items";

            return (
              <div
                key={order._id ?? order.orderID}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-800">
                      {order.orderID ?? order._id}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${statusStyle[status]}`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "Date unavailable"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">
                    {productNames}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <p className="text-sm font-semibold text-tomato">
                    ${Number(order.totalAmount).toFixed(2)}
                  </p>
                  <button
                    onClick={() => navigate("/myorders")}
                    className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full hover:border-tomato hover:text-tomato transition-colors"
                  >
                    View details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
