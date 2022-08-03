import * as React from "react";

/**
 * OverlayProps
 */
export type OverlayProps = {
  children?: React.ReactNode;
};

/**
 * Overlay
 * @param props
 * @constructor
 */
export const Overlay = (props: OverlayProps) => {
  return <div className="fixed w-screen h-screen top-0 left-0 bg-gray-300/75 z-30">{props.children}</div>;
};
