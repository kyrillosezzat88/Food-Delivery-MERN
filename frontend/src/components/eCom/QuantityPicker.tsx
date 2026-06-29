import AddGreenIcon from "@assets/icons/add_icon_green.png";
import RemoveIcon from "@assets/icons/remove_icon_red.png";

type TQuantityPicker = {
  className?: string;
  handleIncrement?: () => void;
  handleDecrement?: () => void;
  quantity?: number;
};

const QuantityPicker = ({
  className,
  handleIncrement,
  handleDecrement,
  quantity,
}: TQuantityPicker) => {
  return (
    <div className={`${className}`}>
      <div className="flex gap-2 bg-white rounded-full p-1 items-center justify-center shadow-lg">
        <img
          src={RemoveIcon}
          className="cursor-pointer"
          alt="Remove"
          onClick={handleDecrement}
        />
        <span>{quantity}</span>
        <img
          src={AddGreenIcon}
          alt="Add"
          onClick={() => {
            handleIncrement?.();
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default QuantityPicker;
