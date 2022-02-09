import React from "react";
import { builder } from "../../../utils/classname/classname";

/**
 * The properties for the widget body.
 */
export type WidgetBodyProps = {
  spacing?: "sm" | "md" | "none";
  children?: React.ReactNode;
};

/**
 * A component for the widget body.
 * @param props
 * @constructor
 */
export const WidgetBody = (props: WidgetBodyProps) => {
  const spacing = props.spacing || "sm";
  const className = builder("h-full")
    .if(spacing === "sm", "p-2")
    .if(spacing === "md", "p-5")
    .build();
  const hasContent = props.children && React.Children.count(props.children) > 0;
  return (
    <div className={className}>
      {!hasContent && (
        <div className="h-full grid justify-items-center content-center h-[4rem]">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-300">
            No content to display.
          </p>
        </div>
      )}
      {hasContent && props.children}
    </div>
  );
};
