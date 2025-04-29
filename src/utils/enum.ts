import { baseURLApi } from "@/apis/utils";

export const LYRICTYPE = {
    COMMON: "COMMON",
    SPECIAL: "SPECIAL",
};

/**
 * 要应用首页 Loading 效果的请求路径
 */
export const REQUEST_LOADING_PATH = [
    baseURLApi("/websiteInfo/front"),
    "/banners/list",
]

