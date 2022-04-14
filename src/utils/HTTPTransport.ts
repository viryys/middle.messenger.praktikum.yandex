import { Props } from "./types";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export type Options = {
  method?: string;
  timeout?: number;
  credentials?: boolean;
  mode?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  data?: Record<string, any>;
};

function queryStringify(data: { [x: string]: any; }) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((
    result,
    key,
    index,
  ) => `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`, "?");
}

export default class HTTPTransport {
  private baseUrl: string = "https://ya-praktikum.tech/api/v2";

  get = (
    url: string,
    options?: Options,
    baseURL?: string,
  ) => this.request(url, { ...options, method: METHODS.GET }, baseURL);

  post = (
    url: string,
    options: Options,
    baseURL?: string,
  ) => this.request(url, { ...options, method: METHODS.POST }, baseURL);

  put = (
    url: string,
    options: Options,
    baseURL?: string,
  ) => this.request(url, { ...options, method: METHODS.PUT }, baseURL);

  delete = (
    url: string,
    options: Options,
    baseURL?: string,
  ) => this.request(url, { ...options, method: METHODS.DELETE }, baseURL);

  request = (url: string, options: Props = {}, baseURL = this.baseUrl) => {
    const {
      headers = {
        "content-type": "application/json",
      },
      method,
      data,
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${baseURL}${url}${queryStringify(data)}`
          : `${baseURL}${url}`,
      );
      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = 5000;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
