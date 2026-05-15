interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemsProps {
  cartItems: CartItem[];
  onUpdateQty: (id: number | string, delta: number) => void;
  onRemove: (id: number | string) => void;
}

const CartItems = ({ cartItems, onUpdateQty, onRemove }: CartItemsProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Cart Items</h2>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
        <span>Item</span>
        <span className="text-center">Price</span>
        <span className="text-center">Quantity</span>
        <span className="text-center">Total</span>
        <span></span>
      </div>

      {cartItems.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 ${
            index !== cartItems.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          {/* Item Info */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div>
              <p className="font-medium text-gray-800 text-sm">{item.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">Fresh & hot</p>
            </div>
          </div>

          {/* Price */}
          <p className="text-sm text-gray-600 text-center hidden md:block">
            ${item.price.toFixed(2)}
          </p>

          {/* Qty Controls */}
          <div className="flex items-center gap-2 justify-center">
            <button
              onClick={() => onUpdateQty(item.id, -1)}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-tomato hover:text-tomato transition-colors text-gray-500"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.id, 1)}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-tomato hover:text-tomato transition-colors text-gray-500"
            >
              +
            </button>
          </div>

          {/* Line Total */}
          <p className="text-sm font-semibold text-tomato text-center">
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          {/* Remove */}
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-300 hover:text-red-400 transition-colors text-lg"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
export type { CartItem };
