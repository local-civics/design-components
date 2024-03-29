import { NavBar, NavBarProps } from "./NavBar";
import { Story } from "@storybook/react";
import { NavLink } from "./NavLink/NavLink";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/NavBar",
  component: NavBar,
};

/**
 * Component storybook template
 */
const Template: Story<NavBarProps> = (args) => (
  <NavBar>
    <NavLink name="home" />
    <NavLink name="profile" />
    <NavLink name="explore" />
    <NavLink name="calendar" />
    <NavLink name="Logout" />
  </NavBar>
);

/**
 * Component stories
 */
export const Component: Story<NavBarProps> = Template.bind({});
Component.args = {};
