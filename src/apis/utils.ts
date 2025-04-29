export const baseURLApi = (url: string) => `/api/v2/blog${url}`;
// 通用响应结果封装
export type resResult<T> = {
  code: number;
  message: string;
  data: T;
};
// 通用分页数据响应结果封装
export type pageData<T> = {
  code?: number;
  data?: {
    /** 列表数据 */
    list: Array<T>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
  message: string;
};
