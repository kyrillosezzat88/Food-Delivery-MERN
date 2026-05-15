import { Link } from "react-router-dom";

const OrderNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-gray-100 bg-white px-8 py-16 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-500">
          Order not found
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-gray-900">
          We couldn’t locate your order
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          The order ID you entered is invalid or the order has already been removed.
          Try checking the link or view your orders again.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-tomato/90"
          >
            Back to menu
          </Link>
          <Link
            to="/myorders"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            View my orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderNotFound;
