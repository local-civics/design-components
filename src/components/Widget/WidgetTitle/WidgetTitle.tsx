import React              from "react";
import { Icon, IconName } from "../../Icon/v0/Icon";

/**
 * The properties for the widget title.
 */
export type WidgetTitleProps = {
  icon?: IconName;
  children: React.ReactNode;
};

/**
 * A component for widget titles.
 * @param props
 * @constructor
 */
export const WidgetTitle = (props: WidgetTitleProps) => {
  return (
    <>
      {props.icon && (
        <div className="w-5 h-5">
          <Icon name={props.icon} />
        </div>
      )}
      <h4 className="grow capitalize align-middle font-semibold">{props.children}</h4>
    </>
  );
};
