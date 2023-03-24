import { Button, ButtonProps } from "./Button";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Button",
  component: Button,
};

/**
 * Component storybook template
 */
const Template: Story<ButtonProps> = (args) => <Button text="Button" size="sm" {...args} />;

/**
 * Component stories
 */
export const Component: Story<ButtonProps> = Template.bind({});
Component.args = {};
