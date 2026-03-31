import { useState } from "react";
import { Link } from "react-router-dom";
import FoodImg from "@assets/images/food_category.png";
import BasketIcon from "@assets/icons/basket_icon.png";
import type { DeliveryFormData } from "@components/cart/DeliveryForm";
import {
  CartItems,
  DeliveryForm,
  OrderSummary,
  PromoCode,
} from "@components/cart";
import type { CartItem } from "@components/cart/CartItems";

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 12.99,
    quantity: 1,
    image: FoodImg,
  },
  { id: 2, name: "Chicken Burger", price: 8.99, quantity: 2, image: FoodImg },
  { id: 3, name: "Caesar Salad", price: 7.49, quantity: 1, image: FoodImg },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [form, setForm] = useState<DeliveryFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = subtotal > 0 ? 2.99 : 0;
  const discount = appliedPromo ? (subtotal * promoDiscount) / 100 : 0;
  const total = subtotal + delivery - discount;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-800">Your Cart</h1>
          <p className="text-sm text-gray-400 mt-1">
            {cartItems.length > 0
              ? `You have ${cartItems.reduce((s, i) => s + i.quantity, 0)} items in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
            <img src={BasketIcon} alt="empty" className="w-16 opacity-20" />
            <p className="text-lg">Nothing here yet</p>
            <Link
              to="/"
              className="bg-tomato text-white px-6 py-2.5 rounded-full text-sm hover:bg-tomato/90 transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6">
              <CartItems
                cartItems={cartItems}
                onUpdateQty={updateQty}
                onRemove={removeItem}
              />
              <DeliveryForm form={form} onChange={setForm} />
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-90 flex flex-col gap-6">
              <OrderSummary
                subtotal={subtotal}
                delivery={delivery}
                discount={discount}
                total={total}
                appliedPromo={appliedPromo}
                promoDiscount={promoDiscount}
              />
              <PromoCode
                appliedPromo={appliedPromo}
                onApply={(code, pct) => {
                  setAppliedPromo(code);
                  setPromoDiscount(pct);
                }}
                onRemove={() => {
                  setAppliedPromo(null);
                  setPromoDiscount(0);
                }}
              />
              <button className="w-full bg-primary cursor-pointer font-bold text-white py-3.5 rounded-full hover:bg-tomato/90 transition-colors text-sm">
                Proceed to Checkout → ${total.toFixed(2)}
              </button>
              <Link
                to="/"
                className="text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
