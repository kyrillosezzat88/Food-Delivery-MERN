export type TLogin = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  token: string;
  user: {
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
};
