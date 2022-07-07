import React from "react";
import { TaskDetails, TaskDetailsProps } from "./TaskDetails";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Task/TaskDetails",
  component: TaskDetails,
};

/**
 * Component storybook template
 */
const Template: Story<TaskDetailsProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <TaskDetails headline="OnboardingDetails TaskPreview" {...args} />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<TaskDetailsProps> = Template.bind({});
Component.args = {};
