import React from "react";
import { Button, ButtonSize } from "../../Button/Button";
import { IconProps } from "../../Icon/v0/Icon";

/**
 * The properties for the widget header link.
 */
export type WidgetHeaderLinkProps = {
  display?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  size?: ButtonSize;
  children: string | React.ReactElement<IconProps>;
};

/**
 * A component for widget header call to action.
 * @param props
 * @constructor
 */
export const WidgetHeaderLink = (props: WidgetHeaderLinkProps) => {
  if (!props.display) {
    return null;
  }

  if (typeof props.children === "string") {
    return <Button size={props.size || "tiny"} text={props.children} onClick={props.onClick} />;
  } else {
    return (
      <div className="flex items-center">
        <Button
          size={props.size || "xs"}
          disabled={props.disabled || !props.onClick}
          icon={props.children.props.name}
          onClick={props.onClick}
        />
      </div>
    );
  }
};
