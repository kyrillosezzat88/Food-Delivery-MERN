import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import type { DeliveryFormData } from "@components/cart/DeliveryForm";
import {
  CartItems,
  DeliveryForm,
  OrderSummary,
  PromoCode,
} from "@components/cart";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetFullProductDetails, clearCart } from "@store/cart/cartSlice";
import { actPlaceOrder } from "@store/orders/orderSlice";
import CartEmpty from "@components/cart/EmptyCart";
import { useCartItems, useCartPricing, usePromo } from "@hooks/useCartData";
import { buildOrderPayload } from "@utils/buildOrderPayload";
import { deliveryFormSchema } from "@validations";

const EMPTY_FORM: DeliveryFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
};

const CartPage = () => {
  const { items, loading, error } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { cartItems, updateQty, removeItem } = useCartItems();
  const { appliedPromo, promoDiscount, applyPromo, removePromo } = usePromo();
  const { subtotal, delivery, discount, total } = useCartPricing(
    cartItems,
    promoDiscount,
    appliedPromo,
  );

  const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliveryFormSchema),
    mode: "onTouched",
    defaultValues: EMPTY_FORM,
  });

  useEffect(() => {
    if (Object.keys(items).length > 0) {
      dispatch(actGetFullProductDetails(items));
    }
  }, []);

  const handleCheckout = async (data: DeliveryFormData) => {
    if (!user || cartItems.length === 0 || submitting) return;

    setSubmitting(true);
    try {
      const result = await dispatch(
        actPlaceOrder(
          buildOrderPayload(user._id!, cartItems, total, data, appliedPromo),
        ),
      );
      if (result.type === actPlaceOrder.fulfilled.type) {
        dispatch(clearCart());
        reset(EMPTY_FORM);
        navigate(`/orderCompleted/${result.payload._id}`);
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = loading === "pending";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-medium text-gray-800">Your Cart</h1>
          <p className="text-sm text-gray-400 mt-1">
            {cartItems.length > 0
              ? `You have ${totalItemCount} item${totalItemCount !== 1 ? "s" : ""} in your cart`
              : "Your cart is empty"}
          </p>
        </header>

        {isLoading && (
          <div className="flex justify-center py-24">
            <p className="text-gray-500">Loading cart items…</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex justify-center py-24">
            <p className="text-red-500">Error loading cart: {error}</p>
          </div>
        )}

        {!isLoading && !error && cartItems.length === 0 && <CartEmpty />}

        {!isLoading && !error && cartItems.length > 0 && (
          <form onSubmit={handleSubmit(handleCheckout)}>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left column — items + delivery */}
              <div className="flex-1 flex flex-col gap-6">
                <CartItems
                  cartItems={cartItems}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                />
                <DeliveryForm register={register} errors={errors} />
              </div>

              {/* Right column — summary + checkout */}
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
                  onApply={applyPromo}
                  onRemove={removePromo}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary cursor-pointer font-bold text-white py-3.5 rounded-full hover:bg-tomato/90 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Placing order…"
                    : `Proceed to Checkout → $${total.toFixed(2)}`}
                </button>
                <Link
                  to="/"
                  className="text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CartPage;
