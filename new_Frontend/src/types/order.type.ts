import type { TProduct } from "./product.type";

export type TOrder = {
  _id?: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  products: {
    product: TProduct;
    quantity: number;
  }[];
  totalAmount: number;
  subtotal: number;
  deliveryCost: number;
  status: string;
  paymentMethod: string;
  deliveryAddress: string;
  phoneNumber: string;
  address: string;
  additionalNotes?: string;
  appliedPromo?: string;
  orderID: string;
  createdAt?: string;
  updatedAt?: string;
};
