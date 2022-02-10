import { Story } from "@storybook/react";
import { WidgetTitle } from "../WidgetTitle/WidgetTitle";
import { WidgetHeader, WidgetHeaderProps } from "./WidgetHeader";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/WidgetHeader",
  component: WidgetHeader,
  argTypes: {},
};

/**
 * Component storybook template
 */
const Template: Story<WidgetHeaderProps> = (args) => (
  <WidgetHeader {...args}>
    <WidgetTitle>My Widget</WidgetTitle>
  </WidgetHeader>
);

/**
 * Component view
 */
export const Component: Story<WidgetHeaderProps> = Template.bind({});
Component.args = {};
