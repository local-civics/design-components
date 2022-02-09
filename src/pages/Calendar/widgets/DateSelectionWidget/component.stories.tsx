import { Story } from "@storybook/react";
import { DateSelectionWidget, DateSelectionWidgetProps } from "./DateSelectionWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Pending/Calendar/DateSelectionWidget",
  component: DateSelectionWidget,
  argTypes: {},
};

/**
 * Component storybook template
 */
const Template: Story<DateSelectionWidgetProps> = (args) => <DateSelectionWidget {...args} />;

/**
 * Component view
 */
export const Component: Story<DateSelectionWidgetProps> = Template.bind({});
Component.args = {};
