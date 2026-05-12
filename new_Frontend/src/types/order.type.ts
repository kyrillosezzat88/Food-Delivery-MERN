export type TOrder = {
  _id?: string;
  user: string;
  products: {
    product: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  paymentMethod: string;
  deliveryAddress: string;
  phoneNumber: string;
  address: string;
  additionalNotes?: string;
  appliedPromo?: string;
};
