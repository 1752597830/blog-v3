import { http } from "@/utils/http";
import { baseURLApi, resResult } from "../utils";

// 所有标签
export const tagList = () => {
  return http.request<resResult<[]>>(
    "get",
    baseURLApi("/tag/list")
  );
};
