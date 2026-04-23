export type TUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  address?: string;
  phoneNumber?: string;
  createdAt?: Date;
  profileImage?: string;
  orders?: string[];
  password: string;
  confirmPassword: string;
  agree: boolean;
  isVerified: boolean;
};
