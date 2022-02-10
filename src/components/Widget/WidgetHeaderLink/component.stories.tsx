import { Story } from "@storybook/react";
import { WidgetHeaderLink, WidgetHeaderLinkProps } from "./WidgetHeaderLink";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/WidgetHeaderLink",
  component: WidgetHeaderLink,
  argTypes: {},
};

/**
 * Component storybook template
 */
const Template: Story<WidgetHeaderLinkProps> = (args) => <WidgetHeaderLink {...args}>See More</WidgetHeaderLink>;

/**
 * Component view
 */
export const Component: Story<WidgetHeaderLinkProps> = Template.bind({});
Component.args = {};
