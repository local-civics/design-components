import * as React                  from "react";
import {AdminProvider}               from "../../providers/AdminProvider/AdminProvider";
import { App, AppProps } from "./App";
import { Story }                    from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Shells/Admin",
  component: App,
};

/**
 * Component storybook template
 */
const Template: Story<AppProps> = (args) => (
    <AdminProvider>
      <div className="h-full w-full overscroll-none font-proxima">
        <App {...args} />
      </div>
    </AdminProvider>
);

/**
 * Component stories
 */
export const Component: Story<AppProps> = Template.bind({});
Component.args = {};
