import * as React                           from "react";
import { Story } from "@storybook/react";
import { Home } from "./Home";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Home",
  component: Home,
  argTypes: {},
};

/**
 * Component storybook template
 */
const Template: Story = () => (
  <div className="relative h-screen w-full overflow-hidden bg-white font-proxima">
    <Home />
  </div>
);

/**
 * Component view
 */
export const Component: Story = Template.bind({});
Component.args = {};
