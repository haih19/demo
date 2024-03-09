import { responseError, responseSuccess } from "@/utils/http";
import { AxiosError, AxiosResponse } from "axios";
import { IApiResult } from "./types";

export const response = async (response: Promise<AxiosResponse>) => {
  try {
    return responseSuccess(await response);
  } catch (error) {
    return responseError(error as AxiosError<IApiResult<undefined>>);
  }
};
