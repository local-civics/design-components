import * as React                            from "react";
import { ManageBucket, ManageBucketProps } from "./ManageBucket";
import { Story }                             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageBuckets/ManageBucket",
  component: ManageBucket,
};

/**
 * Component storybook template
 */
const Template: Story<ManageBucketProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <ManageBucket
          displayName="Bucket #1"
          bucketId="P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1"
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ManageBucketProps> = Template.bind({});
Component.args = {};
