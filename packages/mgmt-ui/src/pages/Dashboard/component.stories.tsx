import * as React                                 from "react";
import {Dashboard, DashboardData, DashboardProps} from "./Dashboard";
import { Story }                                  from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Dashboard",
  component: Dashboard,
};

/**
 * Component storybook template
 */
const Template: Story<DashboardProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <Dashboard {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<DashboardProps> = Template.bind({});
Component.args = {};
