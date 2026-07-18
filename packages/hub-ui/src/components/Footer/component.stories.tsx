import { Story } from "@storybook/react";
import { Footer } from "./Footer";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Footer",
  component: Footer,
};

/**
 * Component storybook template
 */
const Template: Story = (args) => <Footer {...args} />;

/**
 * Component stories
 */
export const Component: Story = Template.bind({});
Component.args = {};
