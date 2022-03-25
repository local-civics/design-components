import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "../../Button/Button";

/**
 * The nav link name.
 */
export type NavLinkName = "home" | "profile" | "explore" | "calendar" | "login" | "logout" | "menu" | "menu-close" | "faq" | "terms" | "privacy";

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
    case "logout":
      config.size = "sm";
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
  case "faq":
      config.text = "FAQ"
      config.size = "sm"
      break
  case "terms":
    config.text = "Terms"
    config.size = "sm"
    break
  case "privacy":
    config.text = "Privacy"
    config.size = "sm"
    break
    default:
      config.text = name;
      break;
  }
};
