import { Story } from "@storybook/react";
import { NavLink, NavLinkProps } from "./NavLink";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/NavBar/NavLink",
  component: NavLink,
};

/**
 * Component storybook template
 */
const Template: Story<NavLinkProps> = (args) => (
    <NavLink {...args} />
);

/**
 * Component stories
 */
export const Component: Story<NavLinkProps> = Template.bind({});
Component.args = {};
