export type TProduct = {
  id: string | number;
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
