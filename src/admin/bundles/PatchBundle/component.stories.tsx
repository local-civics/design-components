import * as React                         from "react";
import { PatchBundle, PatchBundleProps } from "./PatchBundle";
import { Story }                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Bundles/PatchBundle",
  component: PatchBundle,
};

/**
 * Component storybook template
 */
const Template: Story<PatchBundleProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <PatchBundle
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
export const Component: Story<PatchBundleProps> = Template.bind({});
Component.args = {};
