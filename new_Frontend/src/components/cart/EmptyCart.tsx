import { Link } from "react-router-dom";
import BasketIcon from "@assets/icons/basket_icon.png";

const CartEmpty = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
    <img src={BasketIcon} alt="empty cart" className="w-16 opacity-20" />
    <p className="text-lg">Nothing here yet</p>
    <Link
      to="/"
      className="bg-tomato text-white px-6 py-2.5 rounded-full text-sm hover:bg-tomato/90 transition-colors"
    >
      Browse Menu
    </Link>
  </div>
);

export default CartEmpty;
