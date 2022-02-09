import { Story } from "@storybook/react";
import { Event, EventProps } from "./Event";

/**
 * Storybook component configuration
 */
export default {
  title: "Profile/Event",
  component: Event,
};

/**
 * Component storybook template
 */
const Template: Story<EventProps> = (args) => (
  <Event title="Voter Registration 101" notBefore={new Date().toString()} {...args} />
);

/**
 * Component view
 */
export const Component: Story<EventProps> = Template.bind({});
Component.args = {};
