import { Story } from "@storybook/react";
import { DateSelection, DateSelectionProps } from "./DateSelection";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Calendar/DateSelection",
  component: DateSelection,
  argTypes: {},
};

/**
 * Component storybook template
 */
const Template: Story<DateSelectionProps> = (args) => <DateSelection {...args} />;

/**
 * Component view
 */
export const Component: Story<DateSelectionProps> = Template.bind({});
Component.args = {};
