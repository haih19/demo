import { IApiResult } from ".";
import { GeoCoordinatesItem } from "@/types/geo-coordinates";

export type GeoCoordinatesResponse = IApiResult<GeoCoordinatesItem>;

export type GeoCoordinatesParams = {
  city: string;
};
