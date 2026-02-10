export type TUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  address: string;
  phoneNumber: string;
  createdAt: Date;
  profileImage?: string;
  orders: string[];
};
