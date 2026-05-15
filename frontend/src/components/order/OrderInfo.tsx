import type { TOrder } from "@types";

type TOrderInfoProps = {
  recentOrder: TOrder;
};

const OrderInfo = ({ recentOrder }: TOrderInfoProps) => {
  const estimatedTime = "30-45 min";
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-8 py-10 flex flex-col items-center text-center gap-4">
      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-medium text-gray-800">Order Confirmed!</h1>
        <p className="text-gray-400 text-sm mt-1">
          Thanks for your order. We're getting it ready for you.
        </p>
      </div>
      <div className="flex items-center gap-6 mt-2">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            Order No.
          </span>
          <span className="text-sm font-medium text-gray-700">
            {recentOrder?.orderID || "ORD-XXXXXX"}
          </span>
        </div>
        <div className="w-px h-8 bg-gray-100" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            Estimated Time
          </span>
          <span className="text-sm font-medium text-gray-700">
            {estimatedTime}
          </span>
        </div>
        <div className="w-px h-8 bg-gray-100" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            Total Paid
          </span>
          <span className="text-sm font-medium text-tomato">
            {recentOrder?.totalAmount || "0.00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
