import * as React         from "react";
import {iconNames, icons} from "./icons";

/**
 * List of icons available
 */
export const badgeIcons = [
  "formal backpack",
  "formal ballot box",
  "formal bar graph",
  "formal bolt",
  "formal briefcase",
  "formal bullseye",
  "formal burger",
  "formal camera lens",
  "formal design bulb",
  "formal double pan balance",
  "formal easel",
  "formal eye",
  "formal gavel",
  "formal group",
  "formal handshake",
  "formal heart",
  "formal magnifying glass",
  "formal medicine",
  "formal microphone",
  "formal molecule",
  "formal moneybag",
  "formal mortarboard",
  "formal parthenon",
  "formal pencil",
  "formal pie chart",
  "formal pin",
  "formal rocket",
  "formal scholar",
  "formal stopwatch",
] as const;

/**
 * The name of the badge icon.
 */
export type BadgeIconName = typeof badgeIcons[number];

/**
 * The properties for the icon.
 */
export type BadgeIconProps = {
  title?: string
  name?: BadgeIconName;
};

/**
 * A component for badge icons.
 */
export const BadgeIcon = (props: BadgeIconProps) => {
  if(!props.name){
    return null
  }

  const icon = icons[props.name];
  const title = props.title || props.name
  return !!icon && <icon.svg title={title} className="w-full h-full drop-shadow-[inherit]" />;
};
