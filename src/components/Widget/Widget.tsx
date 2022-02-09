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
  resolving?: boolean;
  children?: React.ReactNode;
};

/**
 * A component for widgets.
 * @param props
 * @constructor
 */
export const Widget = (props: WidgetProps) => {
  const className = builder("shadow-sm rounded-md w-full h-full overflow-hidden")
    .if(!props.borderless, "border border-gray-200")
    .if(props.color === "sky", "bg-sky-100")
    .build();

  return (
    <article className={className}>
      {!props.headless && <div className="p-2 bg-gray-200" />}
      <div className="h-full">
        <Loader isLoading={props.resolving}>{props.children}</Loader>
      </div>
    </article>
  );
};
