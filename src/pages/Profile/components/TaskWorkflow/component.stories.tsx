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
    <Task title="task #1" status="review" />
    <Task title="task #2" status="review" />
    <Task title="task #3" />
    <Task title="task #4" />
    <Task title="task #5" />
    <Task title="task #6" />
  </TaskWorkflow>
);

/**
 * Component view
 */
export const Component: Story<TaskWorkflowProps> = Template.bind({});
Component.args = {};
