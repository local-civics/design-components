import React from "react";
import { classname } from "../../../utils/classname/classname";
import { compact } from "../../../utils/number";
import { Button, ButtonSize } from "../../Button";
import { IconName } from "../../Icon";
import { Progress } from "../../Progress";

/**
 * The activity progress height.
 */
export type PathwayProgressHeight = "sm" | "md";

/**
 * The properties for the pathway progress.
 */
export type PathwayProgressProps = {
  xp?: number;
  nextXP?: number;
  level?: number;
  open?: boolean;
  title?: string;
  icon?: IconName;
  height?: PathwayProgressHeight;
  onOpen?: () => void;
};

/**
 * A component for displaying pathway progress.
 * @param props
 * @constructor
 */
export const PathwayProgress = (props: PathwayProgressProps) => {
  const proficiency = props.xp || 0;
  const nextProficiency = props.nextXP || 1;
  const config = defaultActivityProgressConfig();
  const height = props.height || "sm";
  withHeight(config, height);

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex gap-x-2 items-center">
        {props.icon && (
          <div className={config.icon.container}>
            <Button disabled={!props.open} size={config.icon.size} icon={props.icon} onClick={props.onOpen} />
          </div>
        )}
        <div className="grow grid grid-cols-1 gap-2 items-center">
          <div>
            {props.title && <p className="capitalize text-xs text-slate-400">{props.title}</p>}
            <div className={classname(config.progress)}>
              <Progress start={proficiency} end={nextProficiency} />
            </div>
          </div>

          <div className="flex">
            {height !== "sm" && (
              <div className="grow flex gap-x-1">
                <p className={classname(config.xp.value)}>{compact(proficiency)}</p>
                <p className={classname(config.xp.suffix)}>XP</p>
              </div>
            )}
            {height !== "sm" && !!props.level && (
              <p className={classname(config.magnitude)}>
                {compact(nextProficiency - proficiency)} exp. until level {props.level + 1}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type ActivityProgressConfig = {
  progress: {
    height: string;
  };
  xp: {
    suffix: {
      base: string;
      text: string;
    };
    value: {
      base: string;
      text: string;
    };
  };
  magnitude: {
    base: string;
    text: string;
  };
  icon: {
    container: string;
    size: ButtonSize;
  };
};

const defaultActivityProgressConfig = () => {
  const config: ActivityProgressConfig = {
    progress: {
      height: "",
    },
    xp: {
      suffix: {
        base: "text-slate-600 inline-block",
        text: "",
      },
      value: {
        base: "font-bold text-slate-600 inline-block",
        text: "",
      },
    },
    magnitude: {
      base: "text-gray-400",
      text: "",
    },
    icon: {
      container: "",
      size: "md",
    },
  };

  return config;
};

const withHeight = (config: ActivityProgressConfig, height?: PathwayProgressHeight) => {
  height = height || "sm";
  switch (height) {
    case "sm":
      config.progress.height = "h-4";
      config.icon.size = "md";
      config.icon.container = "mt-1";
      config.xp.value.text = "text-sm";
      config.xp.suffix.text = "text-sm";
      config.magnitude.text = "text-sm";
      break;
    case "md":
      config.progress.height = "h-8";
      config.icon.size = "xl";
      config.icon.container = "mt-2";
      config.xp.value.text = "text-xl";
      config.xp.suffix.text = "text-xl";
      config.magnitude.text = "text-sm";
      break;
  }
};
