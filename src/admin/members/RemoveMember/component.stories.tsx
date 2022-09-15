import * as React                          from "react";
import { RemoveMember, RemoveMemberProps } from "./RemoveMember";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Members/RemoveMember",
  component: RemoveMember,
};

/**
 * Component storybook template
 */
const Template: Story<RemoveMemberProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <RemoveMember
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<RemoveMemberProps> = Template.bind({});
Component.args = {};
