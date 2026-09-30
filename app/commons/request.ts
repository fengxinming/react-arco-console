import axios, { type AxiosRequestConfig } from 'axios';
import { Message } from '@arco-design/web-react';
import i18n from '~/i18n';
import { useUserStore } from '~/store';

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

service.interceptors.request.use((config) => {
  const { token } = useUserStore.getState();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  ({ data: res = {} }) => {
    const { code, data, message } = res;
    if (code !== 0 && code !== 200) {
      Message.error(i18n.t(message) || message || i18n.t('Request Error'));
      if (code == null || [1003, 1004, 1005].includes(code)) {
        useUserStore.getState().logout();
      }
      return Promise.reject(res);
    }
    return data ?? res;
  },
  (err = {}) => {
    const { message } = err;
    Message.error(i18n.t(message) || message || i18n.t('Request Error'));
    return Promise.reject(err);
  },
);

export default function request<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return service(url, config).then((response) => response as unknown as T);
}
