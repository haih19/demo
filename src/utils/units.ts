import { UNIT_PREFERENCE_KEY } from "@/helpers/constant";
import { storage } from "./storage";
import { Units } from "@/helpers/enum";
import { UnitItem } from "@/types";

const standardUnits: UnitItem = {
  temp: "K",
  pressure: "hPa",
  humidity: "%",
  speed: "meter/sec",
};

const metricUnits: UnitItem = {
  temp: "C",
  pressure: "hPa",
  humidity: "%",
  speed: "meter/sec",
};

const imperialUnits: UnitItem = {
  temp: "F",
  pressure: "hPa",
  humidity: "%",
  speed: "miles/hour",
};

export const generateUnits = (): UnitItem => {
  const unitType = storage.get(UNIT_PREFERENCE_KEY);

  const map: { [key: string]: UnitItem } = {
    [Units.standard]: standardUnits,
    [Units.metric]: metricUnits,
    [Units.imperial]: imperialUnits,
  };

  return map[unitType] ?? standardUnits;
};
