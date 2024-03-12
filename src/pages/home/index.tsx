import { NoData } from "@/components/no-data";
import CurrentWeather from "@/components/weather/current";
import { WeatherSkeleton } from "@/components/weather/skeleton";
import Weekdays from "@/components/weather/weekdays";
import { useGeoCoordinatesQuery } from "@/http/query/geo-coordinates";
import { useWeatherQuery } from "@/http/query/weather";
import { Form, Input } from "antd";
import { useState } from "react";

const HomePage = () => {
  const [form] = Form.useForm();
  const [city, setCity] = useState<string>("");

  const {
    isFetching: loadingSearchCity,
    data: dataCity,
    refetch,
  } = useGeoCoordinatesQuery(
    { city },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );
  const isEnabledWeatherQuery = (): boolean =>
    !!dataCity?.content?.lat && !!dataCity?.content?.lon;

  const { isFetching: loadingWeather, data: dataWeather } = useWeatherQuery(
    {
      lat: dataCity?.content?.lat,
      lon: dataCity?.content?.lon,
    },
    {
      refetchOnWindowFocus: false,
      enabled: isEnabledWeatherQuery(),
    },
  );

  const onSubmit = (value: { city: string }) => {
    if (value?.city?.trim()) {
      refetch();
    }
  };

  return (
    <div className="home-page-wrap overflow-x-hidden h-full">
      <Form
        form={form}
        name="loginForm"
        className="login-form mt-7 flex flex-col gap-[6px]"
        layout="vertical"
        onFinish={onSubmit}>
        <Form.Item name="city">
          <Input
            size="large"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            allowClear
          />
        </Form.Item>
      </Form>

      <div>
        {loadingSearchCity || loadingWeather ? (
          <WeatherSkeleton />
        ) : (
          <>
            {dataCity?.content ? (
              <>
                <CurrentWeather
                  cityName={dataCity?.content?.name}
                  country={dataCity?.content?.country}
                  current={dataWeather?.content?.current}
                  key="current-weather"
                />
                <Weekdays
                  key="weekdays-weather"
                  weekdays={dataWeather?.content?.daily ?? []}
                />
              </>
            ) : (
              <NoData />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
