import { http } from "@/utils/http";
import { baseURLApi, type resResult } from "../utils";
import WebsiteInfo from "@/apis/website/type.ts";

// 获取网站信息
export const getWebsiteInfo = () => {
  return http.request<resResult<WebsiteInfo>>(
    "get",
    baseURLApi("/websiteInfo/front")
  );
};

// 查询banner列表
// export async function backGetBanners() {
//   return http.request({
//     url: baseURLApi("/banners/list"),
//     method: "get",
//   });
// }
