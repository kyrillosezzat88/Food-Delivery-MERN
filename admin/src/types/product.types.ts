import type { TCategory } from "./category.types";

export type TProduct = {
  _id?: string;
  name: string;
  mainImage: string | File;
  gallery?: (string | File)[];
  description: string;
  count?: number;
  price: number;
  category: string | TCategory;
  createdAt?: string;
  active: boolean;
};
