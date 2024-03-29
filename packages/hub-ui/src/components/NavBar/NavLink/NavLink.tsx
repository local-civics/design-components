import React from "react";
import { Button, ButtonProps } from "../../Button";

/**
 * The nav link name.
 */
export type NavLinkName =
  | "home"
  | "profile"
  | "explore"
  | "calendar"
  | "login"
  | "logout"
  | "menu"
  | "menu-close"
  | "faq"
  | "terms"
  | "privacy";

/**
 * The properties for navigation links.
 */
export type NavLinkProps = {
  name?: NavLinkName | string;
  menu?: boolean;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

/**
 * A component for navigation links.
 * @param props
 * @constructor
 */
export const NavLink = (props: NavLinkProps) => {
  const onClick = () => props.onClick && props.onClick();
  const config = defaultConfig();
  withMenu(config, props.menu);
  withName(config, props.name);

  return <Button disabled={props.disabled} active={props.active} onClick={onClick} {...config} />;
};

const defaultConfig = () => {
  return {} as ButtonProps;
};

const withMenu = (config: ButtonProps, menu?: boolean) => {
  if (menu) {
    config.size = "full:sm";
    config.color = "slate:sky";
    config.spacing = "lg";
  }
};

const withName = (config: ButtonProps, name?: NavLinkName | string) => {
  if (config.size === "full:sm") {
    config.text = name;
    return;
  }

  switch (name) {
    case "home":
      config.logo = true;
      config.size = "lg";
      break;
    case "profile":
      config.icon = name;
      config.size = "lg";
      config.color = "slate:icon";
      break;
    case "explore":
      config.icon = name;
      config.size = "lg";
      config.color = "slate:icon";
      break;
    case "calendar":
      config.icon = name;
      config.size = "lg";
      config.color = "slate:icon";
      break;
    case "login":
      config.size = "sm";
      config.spacing = "sm";
      config.text = "Login";
      config.border = "rounded";
      break;
    case "menu":
      config.icon = name;
      break;
    case "menu-close":
      config.icon = name;
      break;
    case "faq":
      config.text = "Help Center";
      config.size = "sm";
      break;
    case "terms":
      config.text = "Terms";
      config.size = "sm";
      break;
    case "privacy":
      config.text = "Privacy";
      config.size = "sm";
      break;
    case "switch accounts":
      config.icon = "bolt";
      config.size = "lg";
      config.color = "slate:icon";
      break;
    default:
      config.size = "sm";
      config.spacing = "sm";
      config.text = name;
      config.border = "rounded";
      break
  }
};
