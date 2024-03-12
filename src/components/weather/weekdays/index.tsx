import WeatherCardItem from "@/components/weather/item";
import { DailyItem } from "@/types/weather";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";
import "./style.scss";

type Props = {
  weekdays: DailyItem[];
};

const breakpoints: SwiperOptions["breakpoints"] = {
  1024: {
    spaceBetween: 32,
  },
  640: {
    spaceBetween: 16,
  },
};

const Weekdays = ({ weekdays }: Props) => {
  return (
    <div className="weekdays-wrap w-full flex justify-center">
      <Swiper
        slidesPerView="auto"
        breakpoints={breakpoints}>
        {weekdays?.map((weekday) => (
          <SwiperSlide key={weekday.dt}>
            <WeatherCardItem item={weekday} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Weekdays;
