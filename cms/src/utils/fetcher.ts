import axios from '../config';

import type { AxiosRequestConfig } from 'axios';

export const getFetcher = (url: string, params?: AxiosRequestConfig, token?: string | null) => {
  return axios.get(url, { params, headers: { Authorization: `Bearer ${token}` } });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postFetcher = (url: string, payload: any, token?: string | null) => {
  return axios.post(url, payload, { headers: { Authorization: `Bearer ${token}` } });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putFetcher = (url: string, payload: any, token?: string | null) => {
  return axios.put(url, payload, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteFetcher = (url: string, token?: string | null) => {
  return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
};
