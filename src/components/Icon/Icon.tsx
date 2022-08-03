import * as React          from "react"
import { icons, IconName } from "./icons";

export { IconName } from "./icons";

/**
 * The properties for the icon.
 */
export type IconProps = {
  name: IconName;
};

/**
 * A component for icons.
 */
export const Icon = (props: IconProps) => {
  const icon = icons[props.name];
  return icon && <icon.svg title={props.name} className="w-full h-full drop-shadow-[inherit]" />;
};
