import {
  convertTimeStampToDayjs,
  getWeekdays,
  mappingWeekdays,
} from "@/helpers/date-time";
import { renderDegree, weatherCondition } from "@/helpers/function";
import { DailyItem } from "@/types/weather";
import "./style.scss";

type Props = {
  item?: DailyItem;
};

const WeatherCardItem = ({ item }: Props) => {
  return (
    <div className="card-item-wrap">
      <div className="font-medium text-lg">
        {item?.dt
          ? mappingWeekdays(getWeekdays(convertTimeStampToDayjs(item?.dt)))
              .shortName
          : "-"}
      </div>
      <div>
        <img
          src={weatherCondition(
            item?.weather?.length ? item?.weather[0]?.icon : undefined,
          )}
          alt=""
        />
      </div>
      <div className="font-medium text-base">
        {renderDegree(item?.temp?.max)}
      </div>
      <div className="font-400 text-sm">{renderDegree(item?.temp?.min)}</div>
    </div>
  );
};

export default WeatherCardItem;
