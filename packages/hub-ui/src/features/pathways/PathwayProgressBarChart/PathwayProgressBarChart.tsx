import * as React from "react";
import { classname } from "../../../utils/classname/classname";
import { Progress } from "../../../components/Progress";


export type PathwayProgressBarHeight = "sm" | "md";

export type PathwayProgressBarChartProps = {
  targets: Record<string, number>;
  points: Record<string, number>;
  height?: PathwayProgressBarHeight;
};

type ProgressAccent = "sky-blue" | "mint" | "gold";

/**
 * Accent cycles cyan → mint → gold across category rows, same convention used across the rest of
 * the redesigned student pages.
 */
const ACCENT_ORDER: ProgressAccent[] = ["sky-blue", "mint", "gold"];

export const PathwayProgressBarChart = ({
  targets,
  points,
  height = "sm",
}: PathwayProgressBarChartProps) => {
  const entries = Object.entries(targets);
  const config = defaultChartConfig();

  withHeight(config, height);

  if (!entries.length) return null;

  return (
    <div className="grid grid-cols-1 gap-3">
      {entries.map(([categoryId, max], i) => {
        const value = points[categoryId] ?? 0;

        return (
          <div key={categoryId} className="grid grid-cols-1 gap-1.5">
            <div className="flex justify-between items-center">
              <p className="capitalize text-xs font-semibold text-slate-400">{categoryId}</p>
              <p className={classname(config.magnitude)}>
                {value} / {max}
              </p>
            </div>

            <div className={classname(config.progress)}>
              <Progress start={value} end={max || 1} color={ACCENT_ORDER[i % ACCENT_ORDER.length]} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

type ChartConfig = {
  progress: {
    height: string;
  };
  magnitude: {
    base: string;
    text: string;
  };
};

const defaultChartConfig = (): ChartConfig => {
  return {
    progress: {
      height: "",
    },
    magnitude: {
      base: "font-bold text-dark-blue-400",
      text: "",
    },
  };
};

const withHeight = (config: ChartConfig, height: PathwayProgressBarHeight) => {
  switch (height) {
    case "sm":
      config.progress.height = "h-4";
      config.magnitude.text = "text-sm";
      break;
    case "md":
      config.progress.height = "h-8";
      config.magnitude.text = "text-sm";
      break;
  }
};