import { Story } from "@storybook/react";
import { CalendarWidget, CalendarWidgetProps } from "./CalendarWidget";
import { Event } from "../../components/Event/Event";

/**
 * Storybook component configuration
 */
export default {
  title: "Profile/CalendarWidget",
  component: CalendarWidget,
};

/**
 * Component storybook template
 */
const Template: Story<CalendarWidgetProps> = (args) => (
  <CalendarWidget {...args}>
    <Event title="Voter Registration 101" notBefore={new Date().toString()} />
    <Event title="Guess the Odd One Out" notBefore={new Date().toString()} />
    <Event title="Explore NYC Public Data - Your School" notBefore={new Date().toString()} />
  </CalendarWidget>
);

/**
 * Component view
 */
export const Component: Story<CalendarWidgetProps> = Template.bind({});
Component.args = {};
