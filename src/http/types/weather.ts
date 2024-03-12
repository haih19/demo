import { IApiResult } from ".";
import { WeatherItem } from "@/types/weather";

export type WeatherResponse = IApiResult<WeatherItem>;

export type SearchCityWeatherParams = {
  lat?: number;
  lon?: number;
};
