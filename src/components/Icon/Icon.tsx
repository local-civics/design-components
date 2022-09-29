import * as React from "react";
import { icons, IconName } from "./icons";

export {IconName}

/**
 * The properties for the icon.
 */
export type IconProps = {
  title?: string
  name: IconName;
};

/**
 * A component for icons.
 */
export const Icon = (props: IconProps) => {
  const icon = icons[props.name];
  const title = props.title || props.name
  return !!icon && <icon.svg title={title} className="w-full h-full drop-shadow-[inherit]" />;
};
