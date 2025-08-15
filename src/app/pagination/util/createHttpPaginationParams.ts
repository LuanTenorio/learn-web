import { IPagination } from "../interface/IPagination";

export const createHttpPaginationParams = <T>({limit, page}: IPagination<T>) => {
  return {page, limit};
};
