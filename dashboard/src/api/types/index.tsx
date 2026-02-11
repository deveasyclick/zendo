export type APISuccessResponse<T> = {
  code: number;
  data: T;
  message: string;
};
