import { Story } from "@storybook/react";
import { Event } from "../Event/Event";
import { EventList, EventListProps } from "./EventList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Calendar/EventList",
  component: EventList,
};

/**
 * Component storybook template
 */
const Template: Story<EventListProps> = (args) => (
  <EventList {...args}>
    <Event displayName="Event #1" pathway="policy & government" />
    <Event displayName="Event #2" pathway="arts & culture" />
    <Event displayName="Event #3" pathway="volunteer" />
  </EventList>
);

/**
 * Component view
 */
export const Component: Story<EventListProps> = Template.bind({});
Component.args = {};
