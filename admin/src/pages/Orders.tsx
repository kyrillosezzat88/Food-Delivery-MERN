import { Icon, Table } from "@components/common";
import type { TRecentOrder } from "@types";
import { useState } from "react";

const ordersData: TRecentOrder[] = [
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
  {
    id: 4,
    customer: "Emily Brown",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=880&q=80",
    items: "1x Grilled Chicken, 2x Sides",
    total: "$28.75",
    status: "Delivered",
    time: "09:30 AM",
  },
  {
    id: 5,
    customer: "David Wilson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=880&q=80",
    items: "4x Tacos, 1x Guacamole",
    total: "$35.60",
    status: "On the way",
    time: "09:15 AM",
  },
  {
    id: 6,
    customer: "Jessica Taylor",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=880&q=80",
    items: "2x Pasta, 1x Salad",
    total: "$26.40",
    status: "Delivered",
    time: "08:50 AM",
  },
];

const statusPillClasses: Record<TRecentOrder["status"], string> = {
  Delivered: "bg-emerald-50 text-emerald-600",
  "On the way": "bg-primary/10 text-primary",
  Cancelled: "bg-red-50 text-red-600",
};

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Filter orders based on selected status
  const filteredOrders = selectedStatus
    ? ordersData.filter((order) => order.status === selectedStatus)
    : ordersData;

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <h1 className="title">Orders</h1>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setSelectedStatus(null);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              selectedStatus === null
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => {
              setSelectedStatus("Delivered");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              selectedStatus === "Delivered"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => {
              setSelectedStatus("On the way");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              selectedStatus === "On the way"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            On the Way
          </button>
          <button
            onClick={() => {
              setSelectedStatus("Cancelled");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              selectedStatus === "Cancelled"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col">
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
              data={paginatedOrders}
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
                    {order.time}
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

      {/* Pagination Section */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 text-sm capitalize transition-colors duration-200 rounded-full gap-x-2 ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Icon name="ArrowLeftIcon" className="w-5 h-5 rtl:-scale-x-100" />
          <span>previous</span>
        </button>

        <div className="items-center hidden lg:flex gap-x-2">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  pageNum === currentPage
                    ? "text-white rounded-full bg-primary"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="text-gray-400">...</span>
              <button
                onClick={() => handlePageClick(totalPages)}
                className="px-3 py-1 text-xs text-gray-500 rounded-full hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 text-sm capitalize transition-colors duration-200 rounded-full gap-x-2 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <span>Next</span>
          <Icon name="ArrowRightIcon" className="w-5 h-5 rtl:-scale-x-100" />
        </button>
      </div>
    </section>
  );
};

export default Orders;
