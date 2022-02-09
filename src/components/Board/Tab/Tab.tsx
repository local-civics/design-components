import React from "react";
import { classname } from "../../../utils/classname/classname";
import { Icon, IconName } from "../../Icon/Icon";

/**
 * The properties for the tab.
 */
export type TabProps = {
  icon?: IconName;
  title?: string;
  secondary?: boolean;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

/**
 * A component for an individual tab option.
 * @param props
 * @constructor
 */
export const Tab = (props: TabProps) => {
  const config = defaultTabConfig();
  withActive(config, props.active);
  withDisabled(config, props.disabled);
  withSecondary(config, props.secondary);

  const onClick = () => !props.disabled && !props.active && props.onClick && props.onClick();
  return (
    <div onClick={onClick} className={classname(config.container)}>
      <div className="md:m-auto w-max">
        {props.icon && (
          <div className={classname(config.icon)}>
            <Icon name={props.icon} />
          </div>
        )}
        <h4 className={classname(config.title)}>{props.title}</h4>
      </div>
    </div>
  );
};

type TabConfig = {
  active?: boolean;
  disabled?: boolean;
  container: {
    base: string;
    cursor: string;
    shape: string;
    border: string;
    bg: {
      color: string;
      hover: string;
    };
  };
  icon: {
    base: string;
    color: string;
    size: string;
  };
  title: {
    base: string;
    color: string;
    size: string;
  };
};

const defaultTabConfig = () => {
  const config: TabConfig = {
    container: {
      base: "transition ease-in-out w-full py-3 px-5",
      cursor: "cursor-pointer",
      shape: "md:rounded-md",
      bg: {
        color: "",
        hover: "hover:bg-white",
      },
      border: "",
    },
    icon: {
      base: "align-middle inline-block",
      color: "text-slate-600",
      size: "w-5 h-5",
    },
    title: {
      base: "ml-1 capitalize font-semibold align-middle inline-block",
      color: "text-slate-600",
      size: "text-sm",
    },
  };
  return config;
};

const withActive = (config: TabConfig, active?: boolean) => {
  if (active) {
    config.container.cursor = "";
    config.container.bg.color = "bg-white";
  }
  config.active = active;
};

const withDisabled = (config: TabConfig, disabled?: boolean) => {
  if (disabled) {
    config.container.cursor = "";
    config.container.bg.color = "";
    config.container.bg.hover = "";
  }
  config.disabled = disabled;
};

const withSecondary = (config: TabConfig, secondary?: boolean) => {
  if (secondary) {
    config.container.shape = "";
    config.container.bg.color = "";
    config.container.bg.hover = "";
    config.icon.size = "w-4 h-4";
    config.title.size = "text-xs";

    if (config.active) {
      config.container.border = "border-b-2 border-b-sky-400";
      config.icon.color = "text-sky-500";
      config.title.color = "text-sky-500";
    } else if (config.disabled) {
      config.container.border = "border-b border-slate-100 text-slate-600";
      config.icon.color = "";
      config.title.color = "";
    } else {
      config.container.border =
        "border-b border-slate-100 text-slate-600 hover:border-b-2 hover:border-b-sky-400 hover:text-sky-500";
      config.icon.color = "";
      config.title.color = "";
    }
  }
};
