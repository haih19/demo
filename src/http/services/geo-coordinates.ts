import { AxiosCacheInstance } from "axios-cache-interceptor";
import { response } from "@/http/response";
import { GET_GEO_COORDINATES_ENDPOINT } from "@/http/endpoints/geo-coordinates";
import { GeoCoordinatesParams } from "@/http/types/geo-coordinates";

export default (axiosInstance: AxiosCacheInstance) => ({
  getGeoCoordinates(params: GeoCoordinatesParams) {
    return response(
      axiosInstance.get(GET_GEO_COORDINATES_ENDPOINT, { params })
    );
  },
});
