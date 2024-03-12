import { UseQueryOptions, useQuery, QueryKey } from "@tanstack/react-query";
import { apiService } from "@/http/request";
import {
  GeoCoordinatesParams,
  GeoCoordinatesResponse,
} from "@/http/types/geo-coordinates";

export const useGeoCoordinatesQuery = <
  TData = GeoCoordinatesResponse,
  TError = unknown,
>(
  params: GeoCoordinatesParams,
  options?: Omit<
    UseQueryOptions<GeoCoordinatesResponse, TError, TData, QueryKey>,
    "queryKey"
  >,
) =>
  useQuery<GeoCoordinatesResponse, TError, TData>({
    queryKey: ["get-geo-coordinates"],
    queryFn: async () => {
      const res = await apiService.geoCoordinatesService.getGeoCoordinates(
        params,
      );
      return res;
    },
    ...options,
  });
