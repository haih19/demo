import {
  convertTimeStampToDayjs,
  getWeekdays,
  mappingWeekdays,
} from "@/helpers/date-time";
import { renderDegree, weatherCondition } from "@/helpers/function";
import { DailyItem } from "@/types/weather";
import { generateUnits } from "@/utils/units";
import { Col, Row } from "antd";

type Props = {
  item?: DailyItem;
};

const WeatherDetail = ({ item }: Props) => {
  return (
    <div className="weather-pop-detail-content-wrap">
      <Row className="w-full ">
        <Row className="w-full">
          <Col>
            <div className="text-base">
              <span>
                {item?.dt
                  ? mappingWeekdays(
                      getWeekdays(convertTimeStampToDayjs(item?.dt)),
                    ).fullName
                  : "-"}
                ,
              </span>
              <span className="capitalize ml-1">
                {item?.weather?.length ? item?.weather[0]?.description : "-"}
              </span>
            </div>
          </Col>
        </Row>
        <Row
          className="w-full mt-5"
          gutter={24}>
          <Col span={12}>
            <div className="flex justify-start ">
              <div className=" flex items-center">
                <div>
                  <img
                    src={weatherCondition(
                      item?.weather?.length ? item?.weather[0].icon : undefined,
                    )}
                    alt="icon"
                    className="aspect-square"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <div className="font-bold text-5xl xl:text-7xl">
                  <span>
                    {renderDegree(item?.temp?.min)}
                    <span>&deg;</span>
                  </span>
                  <span>-</span>
                  <span className="ml-2">
                    {renderDegree(item?.temp?.max)}
                    <span>&deg;</span>
                  </span>
                  <span>{generateUnits().temp}</span>
                </div>
              </div>
            </div>
          </Col>
          <Col
            span={12}
            className="flex items-center">
            <div className="text-base">
              <div>
                <span>Humidity:</span>
                <span className="font-semibold ml-1">{item?.humidity}</span>
                <span className="ml-1">{generateUnits().humidity}</span>
              </div>
              <div>
                <span>Wind:</span>
                <span className="font-semibold ml-1">{item?.wind_speed}</span>
                <span className="ml-1">{generateUnits().speed}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default WeatherDetail;
