import { MemoryRouter } from "react-router-dom";
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
  <MemoryRouter>
    <NavBar>
      <NavLink name="home" />
      <NavLink name="profile" />
      <NavLink name="explore" />
      <NavLink name="calendar" />
      <NavLink name="logout" />
    </NavBar>
  </MemoryRouter>
);

/**
 * Component stories
 */
export const Component: Story<NavBarProps> = Template.bind({});
Component.args = {};
