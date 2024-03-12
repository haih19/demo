import { UseQueryOptions, useQuery, QueryKey } from "@tanstack/react-query";
import { apiService } from "@/http/request";

import { SearchCityWeatherParams, WeatherResponse } from "@/http/types/weather";

export const useWeatherQuery = <TData = WeatherResponse, TError = unknown>(
  params: SearchCityWeatherParams,
  options?: Omit<
    UseQueryOptions<WeatherResponse, TError, TData, QueryKey>,
    "queryKey"
  >,
) =>
  useQuery<WeatherResponse, TError, TData>({
    queryKey: ["get-weather", params],
    queryFn: async () => {
      const res = await apiService.weatherService.searchCityWeather(params);
      return res;
    },
    ...options,
  });
