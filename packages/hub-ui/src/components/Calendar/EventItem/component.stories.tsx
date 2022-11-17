import { Story } from "@storybook/react";
import { EventItem, EventItemProps } from "./EventItem";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Calendar/EventItem",
  component: EventItem,
};

/**
 * Component storybook template
 */
const Template: Story<EventItemProps> = (args) => (
  <EventItem headline="Item #1" pathway="policy & government" {...args} />
);

/**
 * Component view
 */
export const Component: Story<EventItemProps> = Template.bind({});
Component.args = {};
