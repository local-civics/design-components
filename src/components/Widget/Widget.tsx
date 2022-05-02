import React from "react";
import { builder } from "../../utils/classname/classname";
import { Loader } from "../Loader/Loader";

/**
 * The properties for the widget.
 */
export type WidgetProps = {
  headless?: boolean;
  borderless?: boolean;
  color?: "sky" | "inherit";
  height?: "sm";
  isLoading?: boolean;
  children?: React.ReactNode;
};

/**
 * A component for widgets.
 * @param props
 * @constructor
 */
export const Widget = (props: WidgetProps) => {
  const className = builder("flex flex-col w-full shadow-sm rounded-md overflow-hidden")
    .if(!props.borderless, "border border-gray-200")
    .if(props.color === "sky", "bg-sky-100")
    .if(props.height === "sm", "h-32")
    .build();

  return (
    <article className={className}>
      {!props.headless && <div className="p-2 bg-gray-200" />}
      <Loader isLoading={props.isLoading}>
        <div className="relative w-full">{props.children}</div>
      </Loader>
    </article>
  );
};
