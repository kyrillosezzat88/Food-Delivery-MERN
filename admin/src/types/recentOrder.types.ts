export type TRecentOrder = {
  id: number;
  customer: string;
  avatar: string;
  items: string;
  total: string;
  status: "Delivered" | "On the way" | "Cancelled";
  time: string;
};
