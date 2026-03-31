import { useState } from "react";
import AddGreenIcon from "@assets/icons/add_icon_green.png";
import RemoveIcon from "@assets/icons/remove_icon_red.png";

type TQuantityPicker = {
  className?: string;
};

const QuantityPicker = ({ className }: TQuantityPicker) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={`${className}`}>
      <div className="flex gap-2 bg-white rounded-full p-1 items-center justify-center shadow-lg">
        <img
          src={RemoveIcon}
          alt="Remove"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        />
        <span>{quantity}</span>
        <img
          src={AddGreenIcon}
          alt="Add"
          onClick={() => setQuantity((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};

export default QuantityPicker;
