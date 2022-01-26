import { NavigationBar, NavigationBarProps } from ".";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/NavigationBar",
  component: NavigationBar,
};

/**
 * Component storybook template
 */
const Template: Story<NavigationBarProps> = (args) => (
  <NavigationBar {...args} />
);

/**
 * Component stories
 */
export const Default: Story<NavigationBarProps> = Template.bind({});
Default.args = {};
