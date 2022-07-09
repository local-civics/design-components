import React from "react";
import { TaskCard, TaskCardProps } from "./TaskCard";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Task/TaskCard",
  component: TaskCard,
};

/**
 * Component storybook template
 */
const Template: Story<TaskCardProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <TaskCard headline="Task #1" {...args} />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<TaskCardProps> = Template.bind({});
Component.args = {};
