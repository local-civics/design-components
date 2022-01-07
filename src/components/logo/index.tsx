import React, { FunctionComponent } from "react";

/**
 * Configurable properties for Logo component
 */
export interface LogoProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  /**
   * Logo form
   */
  variant: "l" | "localcivics";
}

/**
 * Logo component
 */
export const Logo: FunctionComponent<LogoProps> = (props) => {
  return (
    <img {...props} src={`https://cdn.localcivics.io/brand/${props.variant}.png`} alt="Logo" />
  );
};
