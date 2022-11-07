import type { AxiosRequestConfig } from 'axios';
import axios from '../config';

export const getFetcher = (url: string, params?: AxiosRequestConfig, token?: string) => {
  return axios.get(url, { params, headers: { Authorization: `Bearer ${token}` } });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postFetcher = (url: string, payload: any, token?: string) => {
  return axios.post(url, payload, { headers: { Authorization: `Bearer ${token}` } });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putFetcher = (url: string, payload: any, token?: string) => {
  return axios.put(url, payload, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteFetcher = (url: string, token?: string) => {
  return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
};
