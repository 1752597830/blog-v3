import { http } from "@/utils/http";
import { baseURLApi, resResult, pageData } from "../utils";
export type ArticlePage = {
  id: number;
  articleTitle: string;
  categoryName: string;
  summary: string;
  tagNameList: string[];
  cover: string;
  visitCount: number;
  isTop: number;
  status: number;
  createTime: Date;
  updateTime: Date;
};

// // 获取首页文章列表
export const getArticleList = (data: any) => {
  return http.request<pageData<ArticlePage>>(
    "get",
    baseURLApi("/article/getArticleList"),
    { params: data }
  );
};
// 获取推荐文章列表
export const getRecommendArticleList = () => {
  return http.request<resResult<[]>>(
    "get",
    baseURLApi("/article/getRecommendArticleList")
  );
};

// // 获取随机文章
export const getRandomArticle = () => {
  return http.request<resResult<[]>>(
    "get",
    baseURLApi("/article/random")
  );
};

// // 相关推荐(按照分类)
// export function getRelatedArticle(categoryId: string, articleId: string) {
//     return http({
//         url: `/article/related/${categoryId}/${articleId}`,
//         method: 'get'
//     })
// }
