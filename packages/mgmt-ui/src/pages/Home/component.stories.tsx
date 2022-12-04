import * as React                  from "react";
import {Home, HomeProps} from "./Home";
import { Story }                   from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Home",
  component: Home,
};

/**
 * Component storybook template
 */
const Template: Story<HomeProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <Home {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<HomeProps> = Template.bind({});
Component.args = {};
