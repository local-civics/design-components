import * as React                                     from "react";
import {DataDashboard, DataDashboardProps} from "./DataDashboard";
import { Story }                                      from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/DataDashboard",
  component: DataDashboard,
};

/**
 * Component storybook template
 */
const Template: Story<DataDashboardProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <DataDashboard {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<DataDashboardProps> = Template.bind({});
Component.args = {};
