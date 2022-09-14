import * as React                            from "react";
import { CreateBucket, CreateBucketProps } from "./CreateBucket";
import { Story }                             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageBuckets/CreateBucket",
  component: CreateBucket,
};

/**
 * Component storybook template
 */
const Template: Story<CreateBucketProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <CreateBucket
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CreateBucketProps> = Template.bind({});
Component.args = {};
