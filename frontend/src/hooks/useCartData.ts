import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart, removeFromCart, decrement } from "@store/cart/cartSlice";
import type { CartItem } from "@components/cart/CartItems";

const DELIVERY_FEE = 2.99;

export function useCartItems() {
  const { itemsFullData, items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const cartItems: CartItem[] = useMemo(
    () =>
      itemsFullData
        .filter((product) => Boolean(product._id))
        .map((product) => ({
          id: product._id as string,
          name: product.name,
          price: product.price,
          quantity: items[product._id as string] || 0,
          image: product.mainImage || "",
        })),
    [itemsFullData, items],
  );

  const updateQty = (id: string | number, delta: number) => {
    const productId = String(id);
    dispatch(delta > 0 ? addToCart(productId) : decrement(productId));
  };

  const removeItem = (id: string | number) => {
    dispatch(removeFromCart(String(id)));
  };

  return { cartItems, updateQty, removeItem };
}

export function useCartPricing(
  cartItems: CartItem[],
  promoDiscount: number,
  appliedPromo: string | null,
) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const discount = appliedPromo ? (subtotal * promoDiscount) / 100 : 0;
  const total = subtotal + delivery - discount;

  return { subtotal, delivery, discount, total };
}

export function usePromo() {
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const applyPromo = (code: string, pct: number) => {
    setAppliedPromo(code);
    setPromoDiscount(pct);
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  return { appliedPromo, promoDiscount, applyPromo, removePromo };
}
