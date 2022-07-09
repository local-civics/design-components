import React from "react";
import { Icon } from "../../Icon";
import { Widget, WidgetBody, WidgetHeader, WidgetHeaderLink, WidgetTitle } from "../../Widget";
/**
 * The properties for the pathway progress widget
 */
export interface PathwayWidgetProps {
  isLoading?: boolean;
  edit?: boolean;
  onHelp?: () => void;
  children?: React.ReactNode;
}

/**
 * A widget to display pathway progress
 * @param props
 * @constructor
 */
export const PathwayWidget = (props: PathwayWidgetProps) => {
  const hasContent = props.children && React.Children.count(props.children) > 0;
  return (
    <Widget isLoading={props.isLoading}>
      <WidgetHeader>
        <WidgetTitle icon="pathway">Pathways</WidgetTitle>
        <WidgetHeaderLink onClick={props.onHelp} display={props.edit}>
          <Icon name="help" />
        </WidgetHeaderLink>
      </WidgetHeader>
      <WidgetBody>{hasContent && <div className="grid gap-2">{props.children}</div>}</WidgetBody>
    </Widget>
  );
};
