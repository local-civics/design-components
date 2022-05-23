import React from "react";
import { TaskWorkflow, TaskWorkflowProps } from "./TaskWorkflow";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Workflow/TaskWorkflow",
  component: TaskWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<TaskWorkflowProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <TaskWorkflow headline="OnboardingWorkflow TaskPreview" {...args} />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<TaskWorkflowProps> = Template.bind({});
Component.args = {};
