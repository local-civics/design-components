import { Story } from "@storybook/react";
import { Widget, WidgetProps } from "./Widget";
import { WidgetBody } from "./WidgetBody/WidgetBody";
import { WidgetHeader } from "./WidgetHeader/WidgetHeader";
import { WidgetHeaderLink } from "./WidgetHeaderLink/WidgetHeaderLink";
import { WidgetTitle } from "./WidgetTitle/WidgetTitle";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Widget",
  component: Widget,
  argTypes: {},
};

/**
 * Component storybook template
 */
const Template: Story<WidgetProps> = (args) => (
  <Widget {...args}>
    <WidgetHeader>
      <WidgetTitle>My Widget</WidgetTitle>
      <WidgetHeaderLink onClick={() => {}}>See More</WidgetHeaderLink>
    </WidgetHeader>
    <WidgetBody />
  </Widget>
);

/**
 * Component view
 */
export const Component: Story<WidgetProps> = Template.bind({});
Component.args = {};
