import * as React from "react";

/**
 * OverlayProps
 */
export type OverlayProps = {
  onClick?: () => void;
  children?: React.ReactNode
};

/**
 * Overlay
 * @param props
 * @constructor
 */
export const Overlay = (props: OverlayProps) => {
    return (
        <div onClick={props.onClick} className="flex cursor-default text-left fixed overscroll-none w-screen h-screen top-0 left-0 bg-gray-300/75 z-30">
          <div className="flex w-full">
              { props.children }
          </div>
        </div>
    );
};
