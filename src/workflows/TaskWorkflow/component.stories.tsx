import React from "react";
import { OpenTask, OpenTaskProps } from "./OpenTask";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Workflow/TaskWorkflow",
  component: OpenTask,
};

/**
 * Component storybook template
 */
const Template: Story<OpenTaskProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <OpenTask headline="Onboarding TaskPreview" {...args} />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<OpenTaskProps> = Template.bind({});
Component.args = {};
