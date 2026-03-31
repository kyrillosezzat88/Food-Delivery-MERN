import { Link } from "react-router-dom";
import { useState } from "react";

const CompletedOrder = () => {
  const [orderNumber] = useState(
    () => "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
  );
  const estimatedTime = "30-45 min";

  const orderedItems = [
    { name: "Margherita Pizza", qty: 1, price: 12.99 },
    { name: "Chicken Burger", qty: 2, price: 8.99 },
    { name: "Caesar Salad", qty: 1, price: 7.49 },
  ];

  const subtotal = orderedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = 2.99;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Success Hero */}
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
            <h1 className="text-2xl font-medium text-gray-800">
              Order Confirmed!
            </h1>
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
                {orderNumber}
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
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-medium text-gray-800">
              Order Summary
            </h2>
          </div>
          <div className="px-6 py-4 flex flex-col gap-3">
            {orderedItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-tomato/10 text-tomato text-xs flex items-center justify-center font-medium">
                    {item.qty}
                  </span>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="text-gray-500">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-1 flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span>${delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-800 text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-medium text-gray-800">
              Delivering To
            </h2>
          </div>
          <div className="px-6 py-4 flex flex-col gap-1 text-sm text-gray-600">
            <p className="font-medium text-gray-800">John Doe</p>
            <p>123 Main Street, New York, 10001</p>
            <p>+1 234 567 8900</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/myorders"
            className="flex-1 bg-tomato text-white text-center py-3 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors"
          >
            Track My Order
          </Link>
          <Link
            to="/"
            className="flex-1 text-center py-3 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrder;
