import { IWeatherServices } from "./weather";
import { IGeoCoordinates } from "./geo-coordinates";

export type IApi = {
  weatherService: IWeatherServices;
  geoCoordinatesService: IGeoCoordinates;
};
