import { Story } from "@storybook/react";
import { Task } from "../Task/Task";
import { TaskWorkflow, TaskWorkflowProps } from "./TaskWorkflow";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/TaskWorkflow",
  component: TaskWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<TaskWorkflowProps> = (args) => (
  <TaskWorkflow {...args}>
    <Task headline="task #1" status="review" />
    <Task headline="task #2" status="review" />
    <Task headline="task #3" />
    <Task headline="task #4" />
    <Task headline="task #5" />
    <Task headline="task #6" />
  </TaskWorkflow>
);

/**
 * Component view
 */
export const Component: Story<TaskWorkflowProps> = Template.bind({});
Component.args = {};
