import { Story } from "@storybook/react";
import { EventItem } from "../EventItem/EventItem";
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
    <EventItem headline="Item #1" pathway="policy & government" />
    <EventItem headline="Item #2" pathway="arts & culture" />
    <EventItem headline="Item #3" pathway="volunteer" />
  </EventList>
);

/**
 * Component view
 */
export const Component: Story<EventListProps> = Template.bind({});
Component.args = {};
