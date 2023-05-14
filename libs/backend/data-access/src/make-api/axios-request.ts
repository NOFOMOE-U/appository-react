import { AxiosRequestConfig } from "axios";

export function axiosRequest(options: AxiosRequestConfig) {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Content-Type': 'application/json',
    },
    responseType: 'json',
    ...options,
  };

  const requestConfig: AxiosRequestConfig = {
    headers: axiosConfig.headers,
    method: axiosConfig.method,
    url: axiosConfig.url,
    data: axiosConfig.data,
    responseType: axiosConfig.responseType,
  };

  return requestConfig;
}
