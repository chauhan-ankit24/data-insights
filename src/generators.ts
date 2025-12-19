import { formatDate } from "insight-sdk";
import type { TimeGrain } from "insight-sdk";

export type DataPoint = {
  fromtime: string;
  totime: string;
  [key: string]: string | number;
};

export const generateTrendData = (
  metric: string,
  grain: TimeGrain,
  fromTime: Date,
  toTime: Date
) => {
  const data: DataPoint[] = [];
  const current = new Date(fromTime);
  console.log("polling", grain);
  const daysIncrement = grain === "daily" ? 1 : grain === "weekly" ? 7 : 30;

  while (current <= toTime) {
    const nextDate = new Date(current);
    nextDate.setDate(nextDate.getDate() + daysIncrement - 1);

    data.push({
      fromtime: formatDate(current),
      totime: formatDate(nextDate > toTime ? toTime : nextDate),
      [metric]: Math.floor(Math.random() * 500) + 100,
    });

    current.setDate(current.getDate() + daysIncrement);
  }

  return data;
};

export const generateContributorData = (
  metric: string,
  dimension: string,
  grain: TimeGrain,
  fromTime: Date,
  toTime: Date,
  dimensionValues: string[]
) => {
  const data: DataPoint[] = [];
  const current = new Date(fromTime);
  console.log(`Fetching ${metric} breakdown by ${dimension}`);

  const daysIncrement = grain === "daily" ? 1 : grain === "weekly" ? 7 : 30;

  while (current <= toTime) {
    const nextDate = new Date(current);
    nextDate.setDate(nextDate.getDate() + daysIncrement - 1);

    const dataPoint: DataPoint = {
      fromtime: formatDate(current),
      totime: formatDate(nextDate > toTime ? toTime : nextDate),
    };

    dimensionValues.forEach((dimValue) => {
      dataPoint[dimValue] = Math.floor(Math.random() * 300) + 50;
    });

    data.push(dataPoint);
    current.setDate(current.getDate() + daysIncrement);
  }

  return data;
};
