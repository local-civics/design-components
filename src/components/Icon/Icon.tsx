import { sprite } from "./data/icons";
import React from "react";
import { icons } from "./data/icons";

/**
 * The name of the icon.
 */
export type IconName = typeof icons[number];

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
  const viewBox = sprite[props.name].viewBox;
  const contents = sprite[props.name].contents;

  if (!contents) {
    return null;
  }

  return (
    <svg
      className="fill-current stroke-current w-full h-full drop-shadow-[inherit]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
    >
      {contents.map((v, k) => {
        return v.d && <path key={k} {...(v as React.SVGProps<SVGPathElement>)} />;
      })}

      {contents.map((v, k) => v.r && <circle key={k} {...(v as React.SVGProps<SVGCircleElement>)} />)}
    </svg>
  );
};
