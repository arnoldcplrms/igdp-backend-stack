export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

type PaginationMeta = {
  total: number;
  skip: number;
  take: number;
};

export type PaginatedApiResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
