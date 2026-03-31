import { useState } from "react";
import { useNavigate } from "react-router-dom";

type OrderStatus = "delivered" | "preparing" | "on the way" | "cancelled";

interface Order {
  id: string;
  date: string;
  items: string;
  total: number;
  status: OrderStatus;
}

const mockOrders: Order[] = [
  {
    id: "ORD-A1B2C3",
    date: "Mar 28, 2026",
    items: "Margherita Pizza, Caesar Salad",
    total: 20.48,
    status: "delivered",
  },
  {
    id: "ORD-D4E5F6",
    date: "Mar 22, 2026",
    items: "Chicken Burger x2",
    total: 17.98,
    status: "delivered",
  },
  {
    id: "ORD-G7H8I9",
    date: "Mar 30, 2026",
    items: "Pasta Carbonara, Tiramisu",
    total: 24.99,
    status: "on the way",
  },
  {
    id: "ORD-J1K2L3",
    date: "Mar 31, 2026",
    items: "BBQ Ribs, Coleslaw",
    total: 31.5,
    status: "preparing",
  },
  {
    id: "ORD-M4N5O6",
    date: "Mar 15, 2026",
    items: "Veggie Wrap",
    total: 9.99,
    status: "cancelled",
  },
];

const statusStyle: Record<OrderStatus, string> = {
  delivered: "bg-green-50 text-green-600",
  preparing: "bg-amber-50 text-amber-600",
  "on the way": "bg-blue-50 text-blue-600",
  cancelled: "bg-red-50 text-red-400",
};

const OrderHistory = () => {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const navigate = useNavigate();

  const filters: (OrderStatus | "all")[] = [
    "all",
    "delivered",
    "preparing",
    "on the way",
    "cancelled",
  ];

  const filtered =
    filter === "all"
      ? mockOrders
      : mockOrders.filter((o) => o.status === filter);

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
                ? "bg-tomato text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="divide-y divide-gray-100">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400 text-sm">
            No orders found
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-800">
                    {order.id}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${statusStyle[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{order.date}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">
                  {order.items}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <p className="text-sm font-semibold text-tomato">
                  ${order.total.toFixed(2)}
                </p>
                <button
                  onClick={() => navigate("/myorders")}
                  className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full hover:border-tomato hover:text-tomato transition-colors"
                >
                  View details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
