import { Story } from "@storybook/react";
import { WidgetBody, WidgetBodyProps } from "./WidgetBody";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Widget/WidgetBody",
  component: WidgetBody,
  argTypes: {},
};

/**
 * Component storybook template
 */
const Template: Story<WidgetBodyProps> = (args) => (
  <WidgetBody {...args}>
    <div className="w-96 h-96 bg-gray-200" />
  </WidgetBody>
);

/**
 * Component view
 */
export const Component: Story<WidgetBodyProps> = Template.bind({});
Component.args = {};
