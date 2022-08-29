import * as React                            from "react";
import { CreateProject, CreateProjectProps } from "./CreateProject";
import { Story }                             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageProjects/CreateProject",
  component: CreateProject,
};

/**
 * Component storybook template
 */
const Template: Story<CreateProjectProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <CreateProject
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CreateProjectProps> = Template.bind({});
Component.args = {};
