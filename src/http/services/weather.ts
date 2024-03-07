import { AxiosCacheInstance } from "axios-cache-interceptor";
import { response } from "@/http/response";
import { WEATHER_ENDPOINT } from "../endpoints/weather";

export default (axiosInstance: AxiosCacheInstance) => ({
  searchCityWeather(params: unknown) {
    return response(axiosInstance.get(WEATHER_ENDPOINT, { params }));
  },
});
