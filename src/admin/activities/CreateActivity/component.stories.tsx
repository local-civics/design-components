import * as React                              from "react";
import { CreateActivity, CreateActivityProps } from "./CreateActivity";
import { Story }                               from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Activity/CreateActivity",
  component: CreateActivity,
};

/**
 * Component storybook template
 */
const Template: Story<CreateActivityProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <CreateActivity
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CreateActivityProps> = Template.bind({});
Component.args = {};
