export type TProduct = {
  _id: string;
  name: string;
  mainImage: string;
  gallery?: string[];
  description: string;
  count: number;
  price: number;
  category: string | null;
  createdAt: string;
  active: boolean;
};
