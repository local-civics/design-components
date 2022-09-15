import * as React                          from "react";
import { CreateBundle, CreateBundleProps } from "./CreateBundle";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Bundles/CreateBundle",
  component: CreateBundle,
};

/**
 * Component storybook template
 */
const Template: Story<CreateBundleProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <CreateBundle
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CreateBundleProps> = Template.bind({});
Component.args = {};
