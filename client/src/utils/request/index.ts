import { message } from 'antd';
import Axios, { AxiosRequestConfig } from 'axios';

const url = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3003' : 'https://si.xjq.icu';

const instance = Axios.create({
  baseURL: `${url}/v1`,
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  const hash = window.location.hash.substring(1);
  config.headers['app-id'] = hash;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const { code, message: msg } = response.data;
    if (code !== 0) {
      message.error(msg);
      return Promise.reject();
    }
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
  return instance.get<T, T>(url, config);
}

export function post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
  return instance.post<T, T>(url, data, config);
}

export default instance;
