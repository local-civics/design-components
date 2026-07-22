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
