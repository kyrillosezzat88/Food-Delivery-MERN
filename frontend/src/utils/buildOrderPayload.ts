import type { DeliveryFormData } from "@components/cart/DeliveryForm";
import type { CartItem } from "@components/cart/CartItems";

export type PlaceOrderPayload = {
  user: string;
  products: { product: string; quantity: number }[];
  totalAmount: number;
  status: "Pending";
  paymentMethod: "cash" | "card" | "online";
  deliveryAddress: string;
  phoneNumber: string;
  address: string;
  additionalNotes?: string;
  appliedPromo?: string | null;
};

export function buildOrderPayload(
  user: string,
  cartItems: CartItem[],
  total: number,
  form: DeliveryFormData,
  appliedPromo?: string | null,
): PlaceOrderPayload {
  return {
    user,
    products: cartItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    })),
    totalAmount: total,
    status: "Pending",
    paymentMethod: "cash",
    deliveryAddress: `${form.address}, ${form.city} ${form.zip}`,
    phoneNumber: form.phone,
    address: form.address,
    additionalNotes: undefined,
    appliedPromo,
  };
}
