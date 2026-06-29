import type { DeliveryFormData } from "@components/cart/DeliveryForm";
import type { CartItem } from "@components/cart/CartItems";
import type { TOrder } from "@types";

export function buildOrderPayload(
  user: string,
  cartItems: CartItem[],
  total: number,
  form: DeliveryFormData,
  appliedPromo?: string | null,
): TOrder {
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
