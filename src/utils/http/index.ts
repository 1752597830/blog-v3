import Axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import useLoadingStore from "@/store/modules/loading";
import type {
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig,
} from "./types.d";
import NProgress from "../progress";
import { message } from "@/utils/message";
import { REQUEST_LOADING_PATH } from "@/utils/enum.ts";
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};
// 白名单：添加需要跳过 code 检查的接口路径
const whiteList: string[] = [
  "https://v1.hitokoto.cn/?c=a&encode=json", // Hitokoto 一言接口
];
const env = import.meta.env;
const pathRequestCount = new Map();
const firstRequestPaths = new Set(); // 使用 Set 来记录已经请求过的路径
let loadingShown = false;
function isInWhiteList(url: string): boolean {
  return whiteList.some((item) => url.includes(item));
}
class PureHttp {
  download(arg0: string, arg1: string) {
    throw new Error("Method not implemented.");
  }
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** 初始化配置对象 */
  private static initConfig: PureHttpRequestConfig = {};

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 重连原始请求 */
  // private static retryOriginalRequest(config: PureHttpRequestConfig) {
  //   return new Promise((resolve) => {
  //     resolve(config);
  //   });
  // }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config: PureHttpRequestConfig): Promise<any> => {
        const url = config?.url;

        // 检查是否是需要显示加载进度条的路径
        const matchingPath = REQUEST_LOADING_PATH.find((path: string) =>
          url?.startsWith(path)
        );

        const isYiYanApi = url?.startsWith(env.VITE_YIYAN_API);

        // 判断是否需要显示进度条
        if (!isYiYanApi || matchingPath) {
          // 仅在第一次请求时显示进度条
          if (matchingPath && !firstRequestPaths.has(matchingPath)) {
            firstRequestPaths.add(matchingPath);
            const currentCount = pathRequestCount.get(matchingPath) || 0;
            pathRequestCount.set(matchingPath, currentCount + 1);

            if (!loadingShown) {
              loadingShown = true;
              const loadingStore = useLoadingStore();
              loadingStore.show();
              NProgress.start();
            }
          } else {
            NProgress.start();
          }
        }

        // 调用请求前回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);
        } else if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback(config);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        const $config = response.config;

        let url = $config?.url;
        let matchingPath = REQUEST_LOADING_PATH.find((path: string) =>
          url?.startsWith(path)
        );
        if (matchingPath) {
          const current = pathRequestCount.get(matchingPath) || 0;
          pathRequestCount.set(matchingPath, current - 1);

          const allDone = [...pathRequestCount.values()].every((v) => v === 0);
          if (allDone) {
            loadingShown = false;
            useLoadingStore().hide();
            pathRequestCount.clear();
            NProgress.done();
          }
        } else {
          NProgress.done();
        }

        const { code, msg } = response.data;
        // 如果是白名单中的接口，直接返回数据
        if (isInWhiteList(url)) {
          return response.data; // 白名单接口，直接返回
        }
        if (code === 200) {
          if (typeof $config.beforeResponseCallback === "function") {
            $config.beforeResponseCallback(response);
          } else if (PureHttp.initConfig.beforeResponseCallback) {
            PureHttp.initConfig.beforeResponseCallback(response);
          }
          return response.data;
        } else if (code === 1012) {
          message(msg); // 显示封禁信息
          // 你也可以在这里触发 store 标志，禁用操作
        } else {
          message(msg || "系统出错");
        }
      },
      (error: PureHttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as PureHttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /** 单独抽离的`post`工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: PureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, params, config);
  }

  /** 单独抽离的`get`工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: PureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("get", url, params, config);
  }
}

export const http = new PureHttp();
