import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { storage } from "./storage";
import { UNIT_PREFERENCE_KEY } from "@/helpers/constant";
import { HeaderItem, Units } from "@/helpers/enum";
import { IApiResult } from "@/http/types";

export const requestInterceptors = async (
  config: InternalAxiosRequestConfig<unknown>
) => {
  const units = storage.get(UNIT_PREFERENCE_KEY);
  config.headers[HeaderItem.unitPreference] = units ?? Units.standard;

  return config;
};

export const requestInterceptorsError = (error: unknown) => {
  return Promise.reject(error);
};

/* eslint @typescript-eslint/no-explicit-any: "off" */
export const responseSuccess = <T = any>(
  response: AxiosResponse<IApiResult<T>, any>
) => {
  const responseData = response?.data;

  return {
    content: responseData?.content,
    status: responseData?.status,
    message: responseData?.message,
  };
};

export const responseError = <T>(error: AxiosError<IApiResult<T>>) => {
  const data = error.response?.data;
  return {
    content: data?.content,
    status: data?.status,
    message: data?.message,
  } as IApiResult<T>;
};
