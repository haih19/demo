import {WeatherSkeletonItem} from "./skeleton-item";

export const WeatherSkeleton = () => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <WeatherSkeletonItem key={item} />
      ))}
    </div>
  );
};
