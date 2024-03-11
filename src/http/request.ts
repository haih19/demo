import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { setupCache } from "axios-cache-interceptor";
import { IApi } from "./interfaces";
import weatherService from "./services/weather";
import geoCoordinatesService from "./services/geo-coordinates";
import { requestInterceptors, requestInterceptorsError } from "@/utils/http";
import { API_SERVICE_PREFIX } from "@/helpers/constant";
import { IApiResult } from "./types";
import { useNotification } from "@/composables/notification";

const baseUrl = import.meta.env.VITE_SERVICE_API;

const axiosInstance = Axios.create({
  baseURL: baseUrl + API_SERVICE_PREFIX,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    return requestInterceptors(config);
  },
  (error) => {
    return requestInterceptorsError(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error: AxiosError<IApiResult<undefined>>) => {
    const { showNotification } = useNotification();
    if (error?.response?.data?.message) {
      showNotification({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
    return error;
  }
);

const cacheInstanceApi = setupCache(axiosInstance);

export const apiService: IApi = {
  weatherService: weatherService(cacheInstanceApi),
  geoCoordinatesService: geoCoordinatesService(cacheInstanceApi),
};
