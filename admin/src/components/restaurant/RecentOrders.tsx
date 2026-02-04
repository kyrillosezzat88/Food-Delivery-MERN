import { Icon, Table } from "@components/common";
import type { TRecentOrder } from "@types";

const data: TRecentOrder[] = [
  {
    id: 1,
    customer: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=880&q=80",
    items: "2x Margherita Pizza, 1x Coke",
    total: "$32.50",
    status: "Delivered",
    time: "10:24 AM",
  },
  {
    id: 2,
    customer: "Sarah Lee",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=880&q=80",
    items: "1x Vegan Burger, 1x Fries",
    total: "$18.90",
    status: "On the way",
    time: "10:12 AM",
  },
  {
    id: 3,
    customer: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=880&q=80",
    items: "3x Sushi Combo",
    total: "$45.00",
    status: "Cancelled",
    time: "09:48 AM",
  },
];

const statusPillClasses: Record<TRecentOrder["status"], string> = {
  Delivered: "bg-emerald-50 text-emerald-600",
  "On the way": "bg-primary/10 text-primary",
  Cancelled: "bg-red-50 text-red-600",
};

const RecentOrders = () => {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-3">
          <h2 className="text-xl font-semibold">Recent Food Orders</h2>
          <span className="px-3 py-1 text-xs text-white bg-primary rounded-full">
            Today
          </span>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button>
      </div>

      <div className="flex flex-col mt-4">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
            <Table
              columns={[
                { key: "customer", header: "Customer" },
                {
                  key: "status",
                  header: "Status",
                  headerClassName:
                    "px-12 py-3.5 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
                },
                { key: "items", header: "Items" },
                { key: "total", header: "Total" },
                { key: "time", header: "Time" },
                { key: "actions", header: "", headerClassName: "py-3.5 px-4" },
              ]}
              data={data}
              renderRow={(order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                      <div className="flex items-center gap-x-2">
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={order.avatar}
                          alt={order.customer}
                        />
                        <div>
                          <h2 className="font-semibold text-gray-900">
                            {order.customer}
                          </h2>
                          <p className="text-xs font-normal text-gray-500">
                            {order.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                        statusPillClasses[order.status]
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current"></span>

                      <h2 className="text-sm font-normal">{order.status}</h2>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {order.items}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {order.total}
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                      <button className="text-gray-400 transition-colors duration-200 hover:text-red-500 focus:outline-none">
                        <Icon name="TrashIcon" className="w-5 h-5" />
                      </button>

                      <button className="text-gray-400 transition-colors duration-200 hover:text-yellow-500 focus:outline-none">
                        <Icon name="EditIcon" className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <a
          href="#"
          className="flex items-center px-4 py-2 text-sm text-gray-600 capitalize transition-colors duration-200 bg-white border border-gray-200 rounded-full gap-x-2 hover:bg-gray-50"
        >
          <Icon name="ArrowLeftIcon" className="w-5 h-5 rtl:-scale-x-100" />

          <span>previous</span>
        </a>

        <div className="items-center hidden lg:flex gap-x-2">
          <a
            href="#"
            className="px-3 py-1 text-xs text-white rounded-full bg-primary"
          >
            1
          </a>
          <a
            href="#"
            className="px-3 py-1 text-xs text-gray-500 rounded-full hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="px-3 py-1 text-xs text-gray-500 rounded-full hover:bg-gray-50"
          >
            3
          </a>
          <a
            href="#"
            className="px-3 py-1 text-xs text-gray-500 rounded-full hover:bg-gray-50"
          >
            ...
          </a>
          <a
            href="#"
            className="px-3 py-1 text-xs text-gray-500 rounded-full hover:bg-gray-50"
          >
            12
          </a>
          <a
            href="#"
            className="px-3 py-1 text-xs text-gray-500 rounded-full hover:bg-gray-50"
          >
            13
          </a>
          <a
            href="#"
            className="px-3 py-1 text-xs text-gray-500 rounded-full hover:bg-gray-50"
          >
            14
          </a>
        </div>

        <a
          href="#"
          className="flex items-center px-4 py-2 text-sm text-gray-600 capitalize transition-colors duration-200 bg-white border border-gray-200 rounded-full gap-x-2 hover:bg-gray-50"
        >
          <span>Next</span>

          <Icon name="ArrowRightIcon" className="w-5 h-5 rtl:-scale-x-100" />
        </a>
      </div>
    </section>
  );
};

export default RecentOrders;
