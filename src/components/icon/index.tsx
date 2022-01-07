import { sprite, icons }   from "./icons";

import React, { FunctionComponent } from "react";

/**
 * Type for icons
 */
export type Icons = typeof icons[number];

/**
 * Configurable properties for Icon component
 */
export interface IconProps extends React.SVGProps<SVGSVGElement>{
  /**
   * The name of the icon to use
   */
  icon: Icons;
}

/**
 * Icon component
 */
export const Icon: FunctionComponent<IconProps> = (props) => {
  return <svg {...props} className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox={sprite[props.icon].viewBox}>
      {sprite[props.icon].contents?.map(
          (v, k) =>
              v.d && <path key={k} {...(v as React.SVGProps<SVGPathElement>)} />
      )}

      {sprite[props.icon].contents?.map(
          (v, k) =>
              v.r && (
                  <circle key={k} {...(v as React.SVGProps<SVGCircleElement>)} />
              )
      )}
  </svg>;
};
