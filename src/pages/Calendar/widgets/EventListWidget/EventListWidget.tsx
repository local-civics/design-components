import React from "react";
import { IconName } from "../../../../components/Icon/Icon";
import { Widget } from "../../../../components/Widget/Widget";
import { WidgetBody } from "../../../../components/Widget/WidgetBody/WidgetBody";
import { WidgetHeader } from "../../../../components/Widget/WidgetHeader/WidgetHeader";
import { WidgetHeaderLink } from "../../../../components/Widget/WidgetHeaderLink/WidgetHeaderLink";
import { WidgetTitle } from "../../../../components/Widget/WidgetTitle/WidgetTitle";
import { Event } from "../../../../old/models/event";
import { EventTabs } from "../../../../old/components/EventTabs";
import { Icon } from "../../../../components";
import { EventList } from "../../../../old/components/EventList";
import { nextDate, previousDate } from "../../../../utils";
import { DateTitle } from "../DateSelectionWidget/DateTitle/DateTitle";

/**
 * The properties for the event date widget.
 */
export type EventListWidgetProps = {
  events: Event[] | null;
  date: Date | null;
  tab: string | null;
  onSetDate: (date: Date | null) => void;
  onSetEvent: (eventName?: string) => void;
  onSetTab: (tab: string) => void;
};

/**
 * A widget for displaying events.
 * @param props
 * @constructor
 */
export const EventListWidget = (props: EventListWidgetProps) => {
  const date = props.date || new Date();
  const tabs = [
    {
      icon: "milestone" as IconName,
      name: "registered",
    },
    {
      icon: "clock" as IconName,
      name: "upcoming",
    },
    {
      icon: "reflection" as IconName,
      name: "reflections",
    },
  ];

  return (
    <Widget>
      <WidgetHeader loose divide>
        <WidgetTitle>
          <DateTitle>{date}</DateTitle>
        </WidgetTitle>
        <WidgetHeaderLink display={!!props.date}>
          <Icon icon="leftArrow" onClick={() => props.onSetDate(previousDate(date))} />
          <Icon icon="rightArrow" onClick={() => props.onSetDate(nextDate(date))} />
        </WidgetHeaderLink>
      </WidgetHeader>
      <WidgetBody>
        {props.date && <EventList events={props.events} onSetEvent={props.onSetEvent} />}
        {!props.date && (
          <EventTabs
            events={props.events}
            tabs={tabs}
            tab={props.tab || "upcoming"}
            onSetEvent={props.onSetEvent}
            onSetTab={props.onSetTab}
          />
        )}
      </WidgetBody>
    </Widget>
  );
};
