import {
  convertTimeStampToDayjs,
  getWeekdays,
  mappingWeekdays,
} from "@/helpers/date-time";
import { renderDegree, weatherCondition } from "@/helpers/function";
import { DailyItem } from "@/types/weather";
import "./style.scss";
import { useState } from "react";
import PopUp from "@/components/pop-up";
import WeatherDetail from "../details";

type Props = {
  item?: DailyItem;
};

const WeatherCardItem = ({ item }: Props) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const handleClickItem = () => {
    setPopUp(!popUp);
  };
  const resetPopUp = () => setPopUp(false);
  return (
    <>
      <div
        className="card-item-wrap cursor-pointer"
        onClick={handleClickItem}>
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
      <PopUp
        open={popUp}
        footer={null}
        onCancel={resetPopUp}
        destroyOnClose>
        <WeatherDetail item={item} />
      </PopUp>
    </>
  );
};

export default WeatherCardItem;
