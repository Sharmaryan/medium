import { AxiosResponse } from "axios";
import createAxiosInstance from "./axiosInstance";

export const getReq = async <T>(url: string, params?: Record<string, any>, clientToken?: string): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  const response = await apiClient.get<T>(url, { params });
  return response;
};

export const postReq = async <T>(url: string, data?: Record<string, any>, clientToken?: string): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  const response = await apiClient.post<T>(url, data);
  return response;
};

export const putReq = async <T>(url: string, data?: Record<string, any>, clientToken?: string): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  const response = await apiClient.put<T>(url, data);
  return response;
};

export const delReq = async <T>(url: string, clientToken?: string): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  const response = await apiClient.delete<T>(url);
  return response;
};
