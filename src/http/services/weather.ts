import { AxiosCacheInstance } from "axios-cache-interceptor";
import { response } from "@/http/response";
import { CURRENT_WEATHER } from "@/http/endpoints/weather";
import { SearchCityWeatherParams } from "@/http/types/weather";

export default (axiosInstance: AxiosCacheInstance) => ({
  searchCityWeather(params: SearchCityWeatherParams) {
    return response(axiosInstance.get(CURRENT_WEATHER, { params }));
  },
});
