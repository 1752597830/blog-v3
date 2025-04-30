import { http } from "@/utils/http";
import { baseURLApi, resResult } from "../utils";

type ArticleDetial = {
  id: number;
  articleTitle: string;
  categoryName: string;
  summary: string;
  tagNameList: string[];
  cover: string;
  content: string;
  isTop: number;
  status: number;
  createTime: Date;
  updateTime: Date;
};
// 获取文章详细
export const getArticleDetail = (id?: number) => {
  return http.request<resResult<ArticleDetial>>(
    "get",
    baseURLApi(`/article/getArticleById/${id}`)
  );
};

// 时间轴
export const getTimeLine = () => {
  return http.get(baseURLApi(`/article/timeLine`));
};
// export const getTimeLine = () => {
//   return http.request({
//     url: "/article/timeLine",
//     method: "get",
//   });
// };

// 查询不同类型下的文章列表
export const whereArticleList = (type: Number, typeId: Number) => {
  return http.request<resResult<ArticleDetial>>(
    "get",
    baseURLApi(`/article/where/list/${typeId}`),
    {
      params: {
        type,
      },
    }
  );
};

// // 文章访问量+1
// export function addArticleVisit(id: Number) {
//   return http.get(`/article/visit/${id}`, {
//     method: "get",
//   });
// }

// // 获取初始化时标题搜索数据
// export function getSearchTitleList() {
//   return http.get(`/article/search/init/title`, {
//     method: "get",
//   });
// }

// // 对内容进行文章搜索
// export function searchArticleContent(content: String) {
//   return http.get("/article/search/by/content", {
//     params: {
//       content,
//     },
//     method: "get",
//   });
// }

// // 搜索热门推荐
// export function getHotRecommend() {
//   return http.get(`/article/hot`, {
//     method: "get",
//   });
// }
