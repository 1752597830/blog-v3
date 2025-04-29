import { http } from "@/utils/http";
import { baseURLApi, resResult } from "../utils";

// 查询分类列表
export const categoryList = () => {
  return http.request<resResult<[]>>(
    "get",
    baseURLApi("/category/list")
  );
};
