export type IApiResult<T> = {
  status: number;
  message: string;
  content: T;
};
