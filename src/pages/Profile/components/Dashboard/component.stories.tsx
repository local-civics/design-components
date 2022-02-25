import { Story } from "@storybook/react";
import { Dashboard, DashboardProps } from "./Dashboard";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/Dashboard",
  component: Dashboard,
};

/**
 * Component storybook template
 */
const Template: Story<DashboardProps> = (args) => <Dashboard {...args} />;

/**
 * Component view
 */
export const Component: Story<DashboardProps> = Template.bind({});
Component.args = {};
