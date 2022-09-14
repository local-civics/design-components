import * as React                                      from "react";
import { RemoveOrganization, RemoveOrganizationProps } from "./RemoveOrganization";
import { Story }                                       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageOrganizations/RemoveOrganization",
  component: RemoveOrganization,
};

/**
 * Component storybook template
 */
const Template: Story<RemoveOrganizationProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <RemoveOrganization
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<RemoveOrganizationProps> = Template.bind({});
Component.args = {};
