// 基于 useFetch 封装请求库
import { hash } from "ohash";
import serverConfig from "@/config";

// 后端返回的数据类型
export interface ResOptions<T> {
  data?: T;
  code?: number;
  msg?: string;
}

/**
 * api请求封装
 * @param { String } url 请求地址
 * @param { Object } options useFtech第二个参数
 * @param { Object } headers 自定义header头, 单独设置headers区分请求参数，也好设置类型
 */
const fetch = (url: string, options?: any, headers?: any): Promise<any> => {
  const reqUrl = url; // 你的接口地址

  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const key = hash(JSON.stringify(options) + url);

  // 可以设置默认headers例如
  const customHeaders = { token: useCookie("token").value, ...headers };

  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, key, headers: customHeaders, baseURL: serverConfig.baseURL, retry: 3 })
      .then(({ data, error }: any) => {
        if (error.value) {
          reject(error.value);
          return;
        }
        const value: ResOptions<any> = data.value;
        if (!value) {
          // 这里处理错你自定义的错误，例如code !== 1
          throw createError({
            statusCode: 500,
            statusMessage: reqUrl,
            message: "自己后端接口的报错信息",
          });
        } else {
          resolve(value);
        }
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
};

export default class Http {
  get(url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: "get", params }, headers);
  }

  post(url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: "post", params }, headers);
  }

  put(url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: "put", params }, headers);
  }

  delete(url: string, params?: any, headers?: any): Promise<any> {
    return fetch(url, { method: "delete", params }, headers);
  }
}
