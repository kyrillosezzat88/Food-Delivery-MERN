import { useState } from "react";
import RatingStar from "@assets/icons/rating_starts.png";
import AddWhiteIcon from "@assets/icons/add_icon_white.png";
import QuantityPicker from "./QuantityPicker";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart, decrement } from "@store/cart/cartSlice";
import type { TProduct } from "@types";

const FoodCard = ({ product }: { product: TProduct }) => {
  const { _id, name, description, price, mainImage } = product;
  const { items } = useAppSelector((state) => state.cart);
  const quantityInCart = items[_id || 0];
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddToCart = (firstAdd?: boolean) => {
    dispatch(addToCart(_id));
    if (firstAdd) {
      setIsAdded((prev) => !prev);
    }
  };
  const handleDecrement = () => {
    if (quantityInCart === 1) {
      setIsAdded(false);
    }
    dispatch(decrement(_id));
  };
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <div className="relative">
        <img src={mainImage} alt="Food" className="w-full h-52 object-cover" />
        {isAdded ? (
          <QuantityPicker
            handleIncrement={handleAddToCart}
            handleDecrement={handleDecrement}
            className="absolute right-3 bottom-3"
            quantity={quantityInCart}
          />
        ) : (
          <img
            src={AddWhiteIcon}
            alt="Add"
            className="absolute right-3 bottom-3 w-10 cursor-pointer"
            onClick={() => handleAddToCart(true)}
          />
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-xl mb-2">{name}</h2>
          <img src={RatingStar} alt="Rating" />
        </div>
        <p className="text-gray-500 text-sm mb-4">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>
        <span className="font-bold text-lg text-primary">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default FoodCard;
