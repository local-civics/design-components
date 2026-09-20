import React from "react";
import { Story } from "@storybook/react";
import { DashboardTopBar, DashboardTopBarProps } from "./DashboardTopBar";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/DashboardTopBar",
  component: DashboardTopBar,
};

/**
 * Component storybook template
 */
const Template: Story<DashboardTopBarProps> = (args) => <DashboardTopBar {...args} />;

/**
 * Component stories
 */
export const Component: Story<DashboardTopBarProps> = Template.bind({});
Component.args = {
  eyebrow: "Student Portal",
  title: "My Profile",
  onNotifications: () => {},
};

/**
 * Exercises the breadcrumb + role-context subtitle added for the navigation-topology round -
 * both render in the left-hand block, distinct from the right-hand `children` action slot.
 */
export const WithBreadcrumbAndSubtitle: Story<DashboardTopBarProps> = Template.bind({});
WithBreadcrumbAndSubtitle.args = {
  eyebrow: "Educator Portal",
  subtitle: "You're viewing this as an educator.",
  breadcrumb: [
    { label: "Pathways", onClick: () => console.log("navigate to /pathways") },
    { label: "Civic Readiness", onClick: () => console.log("navigate to pathway overview") },
    { label: "NYS Seal Badge" },
  ],
  title: "NYS Seal Badge",
  onNotifications: () => {},
};
