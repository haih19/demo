import { apiService } from "@/http/request";
import { useEffect } from "react";

const HomePage = () => {
  const test = async () => {
    try {
      const params: unknown = {
        q: "Hanoi",
        appid: import.meta.env.VITE_WEATHER_API_KEY,
      };
      const res = await apiService.weatherService.searchCityWeather(params);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataFor7days = async (lat: number = 70, lon: number = 70) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFor7days();
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
