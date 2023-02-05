import * as React                          from "react";
import {AdminProvider}                     from "../../../providers/AdminProvider/AdminProvider";
import { NestedNavbar, NestedNavbarProps } from "./NestedNavbar";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Components/NestedNavbar",
  component: NestedNavbar,
};

/**
 * Component storybook template
 */
const Template: Story<NestedNavbarProps> = (args) => (
  <AdminProvider><div className="h-full w-full overscroll-none font-proxima">
    <NestedNavbar
        {...args}
        image={args.image || "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"}
        name={args.name || "Ann Nullpointer"}
        email={args.email || "anullpointer@yahoo.com"}
        version={args.version || "v3.1.2"}
        active={args.active || "Organization/People"}
        links={{
            "Classes": {notifications: 3, href: ""},
            "Badges": {notifications: 12, href: ""},
            "Lessons": {notifications: 57, href: ""},
            "Organization/People": {notifications: 123, href: ""},
        }}
    />
  </div></AdminProvider>
);

/**
 * Component stories
 */
export const Component: Story<NestedNavbarProps> = Template.bind({});
Component.args = {};
