import React from "react";
import { Task } from "../Task/Task";
import { TaskModal, TaskModalProps } from "./TaskModal";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/TaskPreview/TaskModal",
  component: TaskModal,
};

/**
 * Component storybook template
 */
const Template: Story<TaskModalProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <TaskModal visible title="Onboarding TaskPreview" {...args} />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<TaskModalProps> = Template.bind({});
Component.args = {};
