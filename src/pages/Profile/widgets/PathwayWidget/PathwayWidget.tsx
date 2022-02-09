import React from "react";
import { Icon, Widget, WidgetBody, WidgetHeader, WidgetHeaderLink, WidgetTitle } from "../../../../components";
import { ActivityProgressProps } from "../../components/ActivityProgress/ActivityProgress";
/**
 * The properties for the pathway progress widget
 */
export interface PathwayWidgetProps {
  resolving?: boolean;
  edit?: boolean;
  onHelp?: () => void;
  children?: React.ReactElement<ActivityProgressProps> | React.ReactElement<ActivityProgressProps>[];
}

/**
 * A widget to display pathway progress
 * @param props
 * @constructor
 */
export const PathwayWidget = (props: PathwayWidgetProps) => {
  const hasContent = props.children && React.Children.count(props.children) > 0;
  return (
    <Widget resolving={props.resolving}>
      <WidgetHeader>
        <WidgetTitle icon="pathway">Pathways</WidgetTitle>
        <WidgetHeaderLink onClick={props.onHelp} display={props.edit}>
          <Icon name="help" />
        </WidgetHeaderLink>
      </WidgetHeader>
      <WidgetBody>{hasContent && <div className="grid gap-4">{props.children}</div>}</WidgetBody>
    </Widget>
  );
};
