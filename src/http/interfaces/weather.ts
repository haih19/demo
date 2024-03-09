import { SearchCityWeatherParams, WeatherResponse } from "@/http/types/weather";

export type IWeatherServices = {
  searchCityWeather: (
    params: SearchCityWeatherParams
  ) => Promise<WeatherResponse>;
};
