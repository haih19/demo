import { apiService } from "@/http/request";
import { useEffect } from "react";

const HomePage = () => {
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
  return <div>HomePage</div>;
};

export default HomePage;
