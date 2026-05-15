interface OrderSummaryProps {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  appliedPromo: string | null;
  promoDiscount: number;
}

const OrderSummary = ({
  subtotal,
  delivery,
  discount,
  total,
  appliedPromo,
  promoDiscount,
}: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Order Summary</h2>
      </div>
      <div className="px-6 py-5 flex flex-col gap-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery fee</span>
          <span>${delivery.toFixed(2)}</span>
        </div>
        {appliedPromo && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({promoDiscount}%)</span>
            <span>− ${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-gray-800 text-base pt-3 border-t border-gray-100">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
