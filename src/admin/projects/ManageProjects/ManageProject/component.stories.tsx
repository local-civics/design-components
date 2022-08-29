import * as React                            from "react";
import { ManageProject, ManageProjectProps } from "./ManageProject";
import { Story }                             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageProjects/ManageProject",
  component: ManageProject,
};

/**
 * Component storybook template
 */
const Template: Story<ManageProjectProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <ManageProject
          displayName="Project #1"
          projectId="P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1"
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ManageProjectProps> = Template.bind({});
Component.args = {};
