import Axios, { InternalAxiosRequestConfig } from "axios";
import { setupCache } from "axios-cache-interceptor";
import { IApi } from "./interfaces";
import weatherService from "./services/weather";

const baseUrl = import.meta.env.VITE_SERVICE_API;

const axiosInstance = Axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    return config;
  },
  (error) => {
    return error;
  }
);

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => error
);

const cacheInstanceApi = setupCache(axiosInstance);

export const apiService: IApi = {
  weatherService: weatherService(cacheInstanceApi),
};
