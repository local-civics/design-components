import { Story } from "@storybook/react";
import { Event, EventProps } from "./Event";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Calendar/Event",
  component: Event,
};

/**
 * Component storybook template
 */
const Template: Story<EventProps> = (args) => <Event headline="Event #1" pathway="policy & government" {...args} />;

/**
 * Component view
 */
export const Component: Story<EventProps> = Template.bind({});
Component.args = {};
