import { Report } from "@local-civics/js-client";
import React from "react";
import { Progress, Button, IconName, ButtonSize } from "../../../../components";
import { classname } from "../../../../utils/classname/classname";
import { compact } from "../../../../utils/numbers";

/**
 * The activity progress height.
 */
export type ActivityProgressHeight = "sm" | "md";

/**
 * The properties for the pathway progress.
 */
export type ActivityProgressProps = Report & {
  open?: boolean;
  title?: string;
  icon?: IconName;
  height?: ActivityProgressHeight;
  onOpen?: () => void;
};

/**
 * A component for displaying pathway progress.
 * @param props
 * @constructor
 */
export const ActivityProgress = (props: ActivityProgressProps) => {
  const proficiency = props.quality || 0;
  const nextProficiency = props.nextPromotion || 1;
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
            {!!props.degree && (
              <p className={classname(config.magnitude)}>
                {compact(nextProficiency - proficiency)} exp. until level {props.degree + 1}
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

const withHeight = (config: ActivityProgressConfig, height?: ActivityProgressHeight) => {
  height = height || "sm";
  switch (height) {
    case "sm":
      config.progress.height = "h-4";
      config.icon.size = "md";
      config.icon.container = "mt-1";
      config.xp.value.text = "text-xs";
      config.xp.suffix.text = "text-xs";
      config.magnitude.text = "text-xs";
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
