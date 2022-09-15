import * as React                                      from "react";
import { CreateOrganization, CreateOrganizationProps } from "./CreateOrganization";
import { Story }                                       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Organizations/CreateOrganization",
  component: CreateOrganization,
};

/**
 * Component storybook template
 */
const Template: Story<CreateOrganizationProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <CreateOrganization
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CreateOrganizationProps> = Template.bind({});
Component.args = {};
