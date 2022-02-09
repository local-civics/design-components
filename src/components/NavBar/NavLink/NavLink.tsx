import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "../../Button/Button";

/**
 * The nav link name.
 */
export type NavLinkName = "home" | "profile" | "explore" | "calendar" | "login" | "logout" | "menu" | "menu-close";

/**
 * The properties for navigation links.
 */
export type NavLinkProps = {
  name?: NavLinkName;
  menu?: boolean;
  active?: boolean;
  disabled?: boolean;
  path?: string;
  onClick?: () => void;
};

/**
 * A component for navigation links.
 * @param props
 * @constructor
 */
export const NavLink = (props: NavLinkProps) => {
  const navigate = useNavigate();
  const onClick = () => (props.onClick && props.onClick()) || (props.path && navigate(props.path));
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

const withName = (config: ButtonProps, name?: NavLinkName) => {
  if (config.size === "full:sm") {
    config.text = name;
    return;
  }

  switch (name) {
    case "home":
      config.logo = true;
      config.size = "md";
      break;
    case "profile":
      config.icon = name;
      break;
    case "explore":
      config.icon = name;
      break;
    case "calendar":
      config.icon = name;
      break;
    case "login":
      config.size = "tiny";
      config.spacing = "sm";
      config.text = "Login";
      config.border = "rounded";
      break;
    case "logout":
      config.size = "tiny";
      config.spacing = "sm";
      config.text = "Logout";
      config.border = "rounded";
      break;
    case "menu":
      config.icon = name;
      break;
    case "menu-close":
      config.icon = name;
      break;
    default:
      config.text = name;
      break;
  }
};
