import * as React                                      from "react";
import { RenameOrganization, RenameOrganizationProps } from "./RenameOrganization";
import { Story }                                       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageOrganizations/RenameOrganization",
  component: RenameOrganization,
};

/**
 * Component storybook template
 */
const Template: Story<RenameOrganizationProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <RenameOrganization
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<RenameOrganizationProps> = Template.bind({});
Component.args = {};
