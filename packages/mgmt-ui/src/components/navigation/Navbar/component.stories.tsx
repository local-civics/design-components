import * as React from "react";
import { Navbar, NavbarProps } from "./Navbar";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Navigation/Navbar",
  component: Navbar,
};

/**
 * Component storybook template
 */
const Template: Story<NavbarProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <Navbar {...args}/>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<NavbarProps> = Template.bind({});
Component.args = {};
