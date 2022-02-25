import { Story } from "@storybook/react";
import { WidgetTitle, WidgetTitleProps } from "./WidgetTitle";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Widget/WidgetTitle",
  component: WidgetTitle,
  argTypes: {},
};

/**
 * Component storybook template
 */
const Template: Story<WidgetTitleProps> = (args) => <WidgetTitle {...args}>My Widget</WidgetTitle>;

/**
 * Component view
 */
export const Component: Story<WidgetTitleProps> = Template.bind({});
Component.args = {};
