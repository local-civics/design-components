import React from "react";
import { classname } from "../../utils/classname/classname";
import { Icon, IconName } from "../Icon";
import { Logo } from "../Logo";

/**
 * The button color.
 */
export type ButtonColor =
  | "slate"
  | "sky"
  | "green"
  | "rose"
  | "emerald"
  | "primary"
  | "secondary"
  | "slate:sky"
  | "slate:icon"
  | "blue"
  | "dark-blue";

/**
 * The button size.
 */
export type ButtonSize = "tiny" | "xs" | "sm" | "md" | "md-small-text" | "lg" | "xl" | "full:sm" | "full:md";

/**
 * The button spacing.
 */
export type ButtonSpacing = "none" | "xs" | "sm" | "md" | "lg";

/**
 * The button theme.
 */
export type ButtonTheme = "light" | "dark";

/**
 * The button justify.
 */
export type ButtonJustify = "center" | "start";

/**
 * The button border.
 */
export type ButtonBorder = "none" | "rectangle" | "rounded" | "rounded-sm" | "circle" | "circle-sm" | "icon:circle";

/**
 * The button filter.
 */
export type ButtonFilter = "shadow" | "none";

/**
 * The properties for the button.
 */
export type ButtonProps = {
  type?: "submit" | "reset" | "button";
  form?: boolean;
  theme?: ButtonTheme;
  active?: boolean;
  disabled?: boolean;
  color?: ButtonColor;
  size?: ButtonSize;
  spacing?: ButtonSpacing;
  icon?: IconName;
  logo?: boolean;
  justify?: ButtonJustify;
  border?: ButtonBorder;
  filter?: ButtonFilter;
  text?: string;
  footer?: string;
  wide?: boolean;
  onClick?: () => void;
};

/**
 * A component for buttons.
 * @param props
 * @constructor
 */
export const Button = (props: ButtonProps) => {
  const config = defaultConfig();
  withColor(config, props.color || "slate", props.theme);
  withSize(config, props.size || "sm");
  withActive(config, props.active);
  withDisabled(config, props.disabled);
  withFilter(config, props.filter);
  withJustify(config, props.justify);
  withBorder(config, props.border);
  withSpacing(config, props.spacing, props.wide);

  const onClick = () => !props.active && !props.disabled && props.onClick && props.onClick();

  return (
    <button disabled={props.disabled} type={props.type} className={classname(config.button)} onClick={onClick}>
      {props.icon && (
        <span className={classname(config.icon)}>
          <Icon name={props.icon} />
        </span>
      )}
      {props.logo && (
        <span className={classname(config.logo)}>
          <Logo />
        </span>
      )}

      {(props.text || props.footer) && (
        <div className="grid grid-cols-1 justify-items-center gap-4">
          {props.text && <div className="text-center whitespace-nowrap">{props.text}</div>}
          {props.footer && <div className="text-[0.5rem] font-semibold">{props.footer}</div>}
        </div>
      )}
    </button>
  );
};

type ButtonConfig = {
  icon: {
    base: string;
    size: string;
    border: string;
  };
  logo: {
    size: string;
  };
  button: {
    base: string;
    justify: string;
    spacing: string;
    color: {
      active: {
        text: string;
        border: string;
        bg: string;
      };
      interactive: {
        text: string;
        border: string;
        bg: string;
      };
      text: string;
      border: string;
      bg: string;
    };
    size: {
      text: string;
      container: string;
    };
    shadow: string;
    cursor: string;
    border: string;
  };
};

const defaultConfig = () => {
  const config: ButtonConfig = {
    button: {
      base: "transition-colors flex items-center gap-x-2 font-semibold",
      justify: "",
      spacing: "",
      color: {
        active: {
          text: "",
          border: "",
          bg: "",
        },
        interactive: {
          text: "",
          border: "",
          bg: "",
        },
        text: "",
        border: "",
        bg: "",
      },
      size: {
        text: "",
        container: "",
      },
      shadow: "",
      cursor: "",
      border: "",
    },
    icon: {
      base: "",
      size: "",
      border: "",
    },
    logo: {
      size: "",
    },
  };
  return config;
};

const withColor = (config: ButtonConfig, color?: ButtonColor, theme?: ButtonTheme) => {
  switch (color) {
    case "slate":
      config.button.color = {
        text: "text-slate-500",
        border: "border-slate-500",
        bg: "bg-slate-500",
        active: {
          text: "text-slate-600",
          border: "border-slate-600",
          bg: "bg-slate-600",
        },
        interactive: {
          text: "focus:text-slate-600 active:text-slate-600 hover:text-slate-600",
          border: "focus:border-slate-600 active:border-slate-600 hover:border-slate-600",
          bg: "focus:bg-slate-600 active:bg-slate-600 hover:bg-slate-600",
        },
      };
      break;
    case "slate:icon":
      config.button.color = {
        text: "text-slate-500",
        border: "border-slate-500",
        bg: "bg-slate-500",
        active: {
          text: "text-sky-400",
          border: "border-sky-400",
          bg: "bg-sky-400",
        },
        interactive: {
          text: "focus:text-sky-600 active:text-sky-600 hover:text-sky-600",
          border: "focus:border-sky-600 active:border-sky-600 hover:border-sky-600",
          bg: "focus:bg-sky-600 active:bg-sky-600 hover:bg-sky-600",
        },
      };
      break;
    case "sky":
      config.button.color = {
        active: {
          text: "text-sky-600",
          border: "border-sky-600",
          bg: "bg-sky-600",
        },
        text: "text-sky-400",
        border: "border-sky-400",
        bg: "bg-sky-400",
        interactive: {
          text: "focus:text-sky-600 active:text-sky-600 hover:text-sky-600",
          border: "focus:border-sky-600 active:border-sky-600 hover:border-sky-600",
          bg: "focus:bg-sky-600 active:bg-sky-600 hover:bg-sky-600",
        },
      };
      break;
    case "green":
      config.button.color = {
        active: {
          text: "text-green-600",
          border: "border-green-600",
          bg: "bg-green-600",
        },
        interactive: {
          text: "focus:text-green-600 active:text-green-600 hover:text-green-600",
          border: "focus:border-green-600 active:border-green-600 hover:border-green-600",
          bg: "focus:bg-green-600 active:bg-green-600 hover:bg-green-600",
        },
        text: "text-green-400",
        border: "border-green-400",
        bg: "bg-green-400",
      };
      break;
    case "primary":
      config.button.color = {
        active: {
          text: "text-primary-600",
          border: "border-primary-600",
          bg: "bg-primary-600",
        },
        interactive: {
          text: "focus:text-primary-600 active:text-primary-600 hover:text-primary-600",
          border: "focus:border-primary-600 active:border-primary-600 hover:border-primary-600",
          bg: "focus:bg-primary-600 active:bg-primary-600 hover:bg-primary-600",
        },
        text: "text-primary-400",
        border: "border-primary-400",
        bg: "bg-primary-400",
      };
      break;
    case "secondary":
      config.button.color = {
        active: {
          text: "text-secondary-600",
          border: "border-secondary-600",
          bg: "bg-secondary-600",
        },
        interactive: {
          text: "focus:text-secondary-600 active:text-secondary-600 hover:text-secondary-600",
          border: "focus:border-secondary-600 active:border-secondary-600 hover:border-secondary-600",
          bg: "focus:bg-secondary-600 active:bg-secondary-600 hover:bg-secondary-600",
        },
        text: "text-secondary-400",
        border: "border-secondary-400",
        bg: "bg-secondary-400",
      };
      break;
    case "rose":
      config.button.color = {
        active: {
          text: "text-rose-600",
          border: "border-rose-600",
          bg: "bg-rose-600",
        },
        interactive: {
          text: "focus:text-rose-600 active:text-rose-600 hover:text-rose-600",
          border: "focus:border-rose-600 active:border-rose-600 hover:border-rose-600",
          bg: "focus:bg-rose-600 active:bg-rose-600 hover:bg-rose-600",
        },
        text: "text-rose-400",
        border: "border-rose-400",
        bg: "bg-rose-400",
      };
      break;
    case "emerald":
      config.button.color = {
        active: {
          text: "text-emerald-600",
          border: "border-emerald-600",
          bg: "bg-emerald-600",
        },
        interactive: {
          text: "focus:text-emerald-600 active:text-emerald-600 hover:text-emerald-600",
          border: "focus:border-emerald-600 active:border-emerald-600 hover:border-emerald-600",
          bg: "focus:bg-emerald-600 active:bg-emerald-600 hover:bg-emerald-600",
        },
        text: "text-emerald-400",
        border: "border-emerald-400",
        bg: "bg-emerald-400",
      };
      break;
    case "slate:sky":
      config.button.color = {
        active: {
          text: "text-sky-400",
          border: "border-sky-400/95",
          bg: "bg-sky-400/95",
        },
        interactive: {
          text: "focus:text-slate-600 active:text-slate-600 hover:text-sky-400",
          border: "focus:border-sky-300/95 active:border-sky-300/95 hover:border-sky-300/95",
          bg: "hover:bg-sky-400/95",
        },
        text: "text-slate-500",
        border: "border-slate-100",
        bg: "bg-slate-50/95",
      };
      break;
    case "blue":
      config.button.color = {
        active: {
          text: "text-blue-600",
          border: "border-blue-600",
          bg: "bg-blue-600",
        },
        text: "text-blue-400",
        border: "border-blue-400",
        bg: "bg-blue-400",
        interactive: {
          text: "focus:text-blue-600 active:text-blue-600 hover:text-blue-600",
          border: "focus:border-blue-600 active:border-blue-600 hover:border-blue-600",
          bg: "focus:bg-blue-600 active:bg-blue-600 hover:bg-blue-600",
        },
      };
      break;
    case "dark-blue":
      config.button.color = {
        active: {
          text: "text-dark-blue-600",
          border: "border-dark-blue-600",
          bg: "bg-dark-blue-600",
        },
        text: "text-dark-blue-400",
        border: "border-dark-blue-400",
        bg: "bg-dark-blue-400",
        interactive: {
          text: "focus:text-dark-blue-600 active:text-dark-blue-600 hover:text-dark-blue-600",
          border: "focus:border-dark-blue-600 active:border-dark-blue-600 hover:border-dark-blue-600",
          bg: "focus:bg-dark-blue-600 active:bg-dark-blue-600 hover:bg-dark-blue-600",
        },
      };
      break;
  }

  switch (theme) {
    case "dark":
      config.button.color.text = "text-white";
      config.button.color.active.text = "text-white";
      config.button.color.interactive.text = "hover:text-white focus:text-white active:text-white";
      break;
    default:
      config.button.color.bg = "";
      config.button.color.active.bg = "";
      config.button.color.interactive.bg = "";
  }
};

const withSize = (config: ButtonConfig, size?: ButtonSize) => {
  if (size?.startsWith("full:")) {
    config.button.size.container = "w-full";
  }

  switch (size) {
    case "tiny":
      config.button.size.text = "text-[0.5rem]";
      config.icon.size = "w-1 h-1";
      config.logo.size = "w-12 h-1";
      break;
    case "xs":
      config.button.size.text = "text-xs";
      config.icon.size = "w-3 h-3";
      config.logo.size = "w-18 h-3";
      break;
    case "sm":
      config.button.size.text = "text-sm";
      config.icon.size = "w-4 h-4";
      config.logo.size = "w-20 h-4";
      break;
    case "full:sm":
      config.button.size.text = "text-xs md:text-sm";
      config.icon.size = "w-5 h-5 scale-[0.9] p-1 md:scale-[1.2] md:w-6 md:h-6 md:p-1.5 overflow-hidden";
      config.logo.size = "w-20 h-4";
      break;
    case "md":
      config.button.size.text = "text-md";
      config.icon.size = "w-5 h-5";
      config.logo.size = "w-28 h-5 -ml-1";
      break;
    case "md-small-text":
      config.button.size.text = "text-sm";
      config.icon.size = "w-5 h-5";
      config.logo.size = "w-28 h-5 -ml-1";
    case "lg":
      config.button.size.text = "text-md";
      config.icon.size = "w-6 h-6";
      config.logo.size = "w-36 h-6";
      break;
    case "xl":
      config.button.size.text = "text-lg";
      config.icon.size = "w-7 h-7";
      config.logo.size = "w-28 h-7";
      break;
  }
};

const withActive = (config: ButtonConfig, active?: boolean) => {
  if (active) {
    config.button.cursor = "cursor-default";
    config.button.color.text = "";
    config.button.color.border = "";
    config.button.color.bg = "";
  } else {
    config.button.color.active = defaultConfig().button.color.active;
  }
};

const withDisabled = (config: ButtonConfig, disabled?: boolean) => {
  if (disabled) {
    if (config.button.color.text === "text-white") {
      config.button.color.bg = "bg-slate-200";
      config.button.color.border = "border-slate-200";
    }

    config.button.cursor = "cursor-default";
    config.button.color.active.text = "";
    config.button.color.active.border = "";
    config.button.color.active.bg = "";
    config.button.color.interactive.text = "";
    config.button.color.interactive.border = "";
    config.button.color.interactive.bg = "";
  }
};

const withFilter = (config: ButtonConfig, filter?: ButtonFilter) => {
  switch (filter) {
    case "shadow":
      config.button.shadow = "shadow-md";
      break;
    default:
      config.button.shadow = "";
  }
};

const withJustify = (config: ButtonConfig, justify?: ButtonJustify) => {
  switch (justify) {
    case "start":
      config.button.justify = "justify-start";
      break;
    default:
      config.button.justify = "justify-center";
      break;
  }
};

const withBorder = (config: ButtonConfig, border?: ButtonBorder) => {
  switch (border) {
    case "rounded":
      config.button.border = "border-2 rounded-md";
      break;
    case "rounded-sm":
      config.button.border = "border rounded-md";
      break;
    case "rectangle":
      config.button.border = "border";
      break;
    case "circle":
      config.button.border = "border-2 rounded-full";
      break;
    case "circle-sm":
      config.button.border = "border rounded-full";
      break;
    case "icon:circle":
      config.icon.border = "border rounded-full";
      break;
    default:
      config.button.border = "";
      break;
  }
};

const withSpacing = (config: ButtonConfig, spacing?: ButtonSpacing, wide?: boolean) => {
  switch (spacing) {
    case "xs":
      config.button.spacing = "py-0.5 px-3";
      break;
    case "sm":
      config.button.spacing = "py-1 px-5";
      break;
    case "md":
      config.button.spacing = "py-3 px-8";
      break;
    case "lg":
      config.button.spacing = "py-3 px-8";
      break;
    default:
      config.button.spacing = "";
      break;
  }

  if (wide) {
    config.button.spacing = "py-2.5 px-10";
  }
};
