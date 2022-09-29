import * as React                                  from "react";
import { ChangeMemberRole, ChangeMemberRoleProps } from "./ChangeMemberRole";
import { Story }                                   from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Members/ChangeMemberRole",
  component: ChangeMemberRole,
};

/**
 * Component storybook template
 */
const Template: Story<ChangeMemberRoleProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <ChangeMemberRole
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ChangeMemberRoleProps> = Template.bind({});
Component.args = {};
