import * as React                          from "react";
import { RenameMember, RenameMemberProps } from "./RenameMember";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageMembers/RenameMember",
  component: RenameMember,
};

/**
 * Component storybook template
 */
const Template: Story<RenameMemberProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <RenameMember
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<RenameMemberProps> = Template.bind({});
Component.args = {};
