export type TProduct = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  mainImage?: string;
  gallery?: string[];
  count?: number;
  active?: boolean;
  createdAt?: Date;
};
