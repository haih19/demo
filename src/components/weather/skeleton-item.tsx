import {Skeleton} from "antd";

export const WeatherSkeletonItem = () => {
  return (
    <div className="skeleton-item-wrap flex flex-col gap-2.5">
      <Skeleton.Input
        active
        block={true}
      />
      <Skeleton.Image
        className="!w-full"
        active
      />
      <Skeleton active />
    </div>
  );
};
