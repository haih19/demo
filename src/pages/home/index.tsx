import {NoData} from "@/components/no-data";
import {WeatherSkeleton} from "@/components/weather/skeleton";
import {apiService} from "@/http/request";
import {Form, Input} from "antd";
import {useEffect, useState} from "react";

const HomePage = () => {
  const [form] = Form.useForm();
  const [city, setCity] = useState<string>("");
  const test = async () => {
    try {
      const res = await apiService.geoCoordinatesService.getGeoCoordinates({
        city: "Hanoi",
      });
      console.log("res>>>", res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    test();
  }, []);
  return (
    <div className="home-page-wrap overflow-x-hidden">
      <Form
        form={form}
        name="loginForm"
        className="login-form mt-7 flex flex-col gap-[6px]"
        layout="vertical"
        onFinish={() => console.log("test")}>
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
        {/* <NoData /> */}

        <WeatherSkeleton />
      </div>
    </div>
  );
};

export default HomePage;
