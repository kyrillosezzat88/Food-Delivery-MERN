import { useState } from "react";
import FoodImg from "@assets/images/food_category.png";
import RatingStar from "@assets/icons/rating_starts.png";
import AddWhiteIcon from "@assets/icons/add_icon_white.png";
import QuantityPicker from "./QuantityPicker";

const FoodCard = () => {
  const [isAdded, setIsAdded] = useState(false);
  const handleAddToCart = () => {
    setIsAdded((prev) => !prev);
  };
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <div className="relative">
        <img src={FoodImg} alt="Food" className="w-full" />
        {isAdded ? (
          <QuantityPicker className="absolute right-3 bottom-3" />
        ) : (
          <img
            src={AddWhiteIcon}
            alt="Add"
            className="absolute right-3 bottom-3 w-10"
            onClick={handleAddToCart}
          />
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-xl mb-2">Sushi</h2>
          <img src={RatingStar} alt="Rating" />
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Food provides essential nutrients for overall health and well-being
        </p>
        <span className="font-bold text-lg text-primary">$22.00</span>
      </div>
    </div>
  );
};

export default FoodCard;
