import React from "react";
import { builder } from "../../../utils/classname/classname";

/**
 * The properties for the widget header.
 */
export type WidgetHeaderProps = {
  loose?: boolean;
  divide?: boolean;
  children?: React.ReactNode;
};

/**
 * A component for widget headers.
 * @param props
 * @constructor
 */
export const WidgetHeader = (props: WidgetHeaderProps) => {
  const className = builder()
    .if(!!props.divide, "border-b border-gray-200")
    .if(!props.loose, "p-2")
    .else("p-5")
    .build();
  return (
    <div className={className}>
      <div className="flex items-center text-slate-600 items-center flex gap-x-1">{props.children}</div>
    </div>
  );
};
