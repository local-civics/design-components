import { Logo } from "./Logo";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Logo",
  component: Logo,
};

/**
 * Component storybook template
 */
const Template: Story = (args) => (
  <div className="w-36">
    <Logo {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story = Template.bind({});
Component.args = {};
