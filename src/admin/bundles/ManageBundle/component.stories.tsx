import * as React                          from "react";
import { ManageBundle, ManageBundleProps } from "./ManageBundle";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageBundles/ManageBundle",
  component: ManageBundle,
};

/**
 * Component storybook template
 */
const Template: Story<ManageBundleProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <ManageBundle
          displayName="Bundle #1"
          bundleId="P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1"
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ManageBundleProps> = Template.bind({});
Component.args = {};
