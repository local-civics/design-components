import { Story } from "@storybook/react";
import { EventPreview } from "../EventPreview/EventPreview";
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
    <EventPreview headline="EventPreview #1" pathway="policy & government" />
    <EventPreview headline="EventPreview #2" pathway="arts & culture" />
    <EventPreview headline="EventPreview #3" pathway="volunteer" />
  </EventList>
);

/**
 * Component view
 */
export const Component: Story<EventListProps> = Template.bind({});
Component.args = {};
