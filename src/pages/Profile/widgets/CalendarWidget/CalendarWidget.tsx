import React from "react";
import { Widget, WidgetBody, WidgetHeader, WidgetHeaderLink, WidgetTitle } from "../../../../components";
import { EventProps } from "../../components/Event/Event";

/**
 * The properties for the event sample widget.
 */
export interface CalendarWidgetProps {
  resolving?: boolean;
  edit?: boolean;
  children?: React.ReactElement<EventProps> | React.ReactElement<EventProps>[];
  onSeeAll?: () => void;
}

/**
 * A widget for listing a sample of events.
 * @param props
 * @constructor
 */
export const CalendarWidget = (props: CalendarWidgetProps) => {
  const hasContent = props.children && React.Children.count(props.children) > 0;
  return (
    <Widget resolving={props.resolving}>
      <WidgetHeader>
        <WidgetTitle icon="calendar">My Events</WidgetTitle>
        <WidgetHeaderLink display={props.edit} onClick={props.onSeeAll}>
          See All
        </WidgetHeaderLink>
      </WidgetHeader>
      <WidgetBody>{hasContent && <div className="grid grid-cols-1 gap-2">{props.children}</div>}</WidgetBody>
    </Widget>
  );
};
