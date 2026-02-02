export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  createdAt: Date;
  isAdmin: boolean;
  orders?: string[];
  profileImage?: string;
};
