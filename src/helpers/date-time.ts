import dayjs, { Dayjs } from "dayjs";

type WeekdayItem = {
  shortName: string;
  fullName: string;
};

export const convertTimeStampToDayjs = (time: number) => dayjs.unix(time);

const weekdaysName: {
  [key: string]: WeekdayItem;
} = {
  sunday: {
    shortName: "Sun",
    fullName: "Sunday",
  },
  monday: {
    shortName: "Mon",
    fullName: "Monday",
  },
  tuesday: {
    shortName: "Tue",
    fullName: "Tuesday",
  },
  wednesday: {
    shortName: "Wed",
    fullName: "Wednesday",
  },
  thursday: {
    shortName: "Thu",
    fullName: "Thursday",
  },
  friday: {
    shortName: "Fri",
    fullName: "Friday",
  },
  saturday: {
    shortName: "Sat",
    fullName: "Saturday",
  },
  none: {
    shortName: "-",
    fullName: "-",
  },
};

export const mappingWeekdays = (day?: number): WeekdayItem => {
  if (!day && day !== 0) return weekdaysName.none;
  const map: { [key: number]: WeekdayItem } = {
    0: weekdaysName.sunday,
    1: weekdaysName.monday,
    2: weekdaysName.tuesday,
    3: weekdaysName.wednesday,
    4: weekdaysName.thursday,
    5: weekdaysName.friday,
    6: weekdaysName.saturday,
  };

  return map[day] || weekdaysName.none;
};

export const getWeekdays = (day: Dayjs): number => {
  return day.day();
};

export const generateTimePeriod = (day?: number) =>
  day ? convertTimeStampToDayjs(day).format("hA") : "-";
