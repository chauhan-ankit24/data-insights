import type { TimeGrain } from "insight-sdk";
import { generateTrendData, generateContributorData } from "./generators";

type DataPoint = {
  fromtime: string;
  totime: string;
  [key: string]: string | number;
};

export const trendDataResolver = async (
  metric: string,
  grain: TimeGrain,
  fromTime: Date,
  toTime: Date
): Promise<DataPoint[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return generateTrendData(metric, grain, fromTime, toTime);
};

export const contributorDataResolver = async (
  metric: string,
  grain: TimeGrain,
  fromTime: Date,
  toTime: Date
): Promise<DataPoint[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const dimensions = ["India", "China", "USA", "Germany"];
  // return [];
  return generateContributorData(
    metric,
    "location",
    grain,
    fromTime,
    toTime,
    dimensions
  );
};

export const dimensionValuesResolver = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _metric: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _dimension: string
): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return ["India", "China", "USA", "Germany"];
};
