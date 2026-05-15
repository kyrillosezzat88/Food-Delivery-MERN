import type { TOrder } from "@types";

type TOrderSummaryProps = {
  recentOrder: TOrder;
  subtotal: number;
  deliveryCost: number;
  total: number;
};
const OrderSummary = ({
  recentOrder,
  subtotal,
  deliveryCost,
  total,
}: TOrderSummaryProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Order Summary</h2>
      </div>
      <div className="px-6 py-4 flex flex-col gap-3">
        {recentOrder?.products.map(({ product, quantity }, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-tomato/10 text-tomato text-xs flex items-center justify-center font-medium">
                {quantity}
              </span>
              <span className="text-gray-700">{product.name}</span>
            </div>
            <span className="text-gray-500">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-100 pt-3 mt-1 flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery fee</span>
            <span>${deliveryCost}</span>
          </div>
          <div className="flex justify-between font-medium text-gray-800 text-base pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
