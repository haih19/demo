import {
  convertTimeStampToDayjs,
  generateTimePeriod,
  getWeekdays,
  mappingWeekdays,
} from "@/helpers/date-time";
import { renderDegree, weatherCondition } from "@/helpers/function";
import { ICurrent } from "@/types/weather";
import { generateUnits } from "@/utils/units";
import { Col, Row } from "antd";

type Props = {
  cityName?: string;
  country?: string;
  current?: ICurrent;
};

const CurrentWeather = ({ cityName, country, current }: Props) => {
  return (
    <Row className="w-full ">
      <Row className="w-full">
        <Col>
          <div className="font-semibold text-2xl text-dark">
            <span>{cityName}</span>, <span>{country}</span>
          </div>
          <div className="text-base">
            <span>
              {current?.dt
                ? mappingWeekdays(
                    getWeekdays(convertTimeStampToDayjs(current?.dt)),
                  ).fullName
                : "-"}
            </span>
            <span className="ml-1">{generateTimePeriod(current?.dt)}, </span>
            <span className="capitalize">
              {current?.weather?.length
                ? current?.weather[0]?.description
                : "-"}
            </span>
          </div>
        </Col>
      </Row>
      <Row
        className="w-full mt-5"
        gutter={24}>
        <Col
          span={24}
          xl={{ span: 12 }}>
          <div className="flex justify-start ">
            <div className=" flex items-center">
              <div>
                <img
                  src={weatherCondition(
                    current?.weather?.length
                      ? current?.weather[0].icon
                      : undefined,
                  )}
                  alt="icon"
                  className="aspect-square"
                />
              </div>
            </div>
            <div className="flex items-end">
              <div className="font-bold text-5xl xl:text-7xl">
                {renderDegree(current?.temp)}
                <span>&deg;</span>
                <span>{generateUnits().temp}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col
          span={24}
          xl={{ span: 12 }}
          className="flex items-center">
          <div className="text-base">
            <div>
              <span>Humidity:</span>
              <span className="font-semibold ml-1">{current?.humidity}</span>
              <span className="ml-1">{generateUnits().humidity}</span>
            </div>
            <div>
              <span>Wind:</span>
              <span className="font-semibold ml-1">{current?.wind_speed}</span>
              <span className="ml-1">{generateUnits().speed}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default CurrentWeather;
