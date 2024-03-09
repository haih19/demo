import {
  GeoCoordinatesParams,
  GeoCoordinatesResponse,
} from "@/http/types/geo-coordinates";

export type IGeoCoordinates = {
  getGeoCoordinates: (
    params: GeoCoordinatesParams
  ) => Promise<GeoCoordinatesResponse>;
};
