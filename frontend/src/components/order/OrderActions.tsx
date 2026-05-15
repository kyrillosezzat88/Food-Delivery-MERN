import { Link } from "react-router-dom";

const OrderActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        to="/myorders"
        className="flex-1 bg-primary text-white text-center py-3 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors"
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
  );
};

export default OrderActions;
