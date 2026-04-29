export type TPaginatedResponse<T> = {
  currentPage: number;
  totalPages: number;
  limit: number;
  TotalRecords: number;
  data: T[];
};
