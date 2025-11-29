import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BACKEND_URL = 'https://10.react.htmlacademy.pro/wtw';
const REQUEST_TIMEOUT = 5000;

const TOKEN_KEY_NAME = 'wtw-token';

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY_NAME);
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
};
