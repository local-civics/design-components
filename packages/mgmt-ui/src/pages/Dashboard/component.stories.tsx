import * as React                      from "react";
import {Dashboard, DashboardProps} from "./Dashboard";
import { Story }                       from "@storybook/react";

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
    <Dashboard
        {...args}
        points={args.points || [
            {time: '2020-01-01'},
            {time: '2020-01-01'},
            {time: '2020-01-04'},
            {time: '2020-01-04'},
            {time: '2020-01-11'},
            {time: '2020-01-11'},
            {time: '2020-02-11'},
            {time: '2020-03-11'},
            {time: '2020-03-11'},
            {time: '2020-04-11'},
            {time: '2020-04-11'},
            {time: '2020-04-11'},
            {time: '2020-04-11'},
            {time: '2020-10-07'},
            {time: '2020-01-09'}]}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<DashboardProps> = Template.bind({});
Component.args = {};
