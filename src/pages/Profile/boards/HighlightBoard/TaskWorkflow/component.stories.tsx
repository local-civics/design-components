import { Story } from "@storybook/react";
import { Task } from "../../../components/Task/Task";
import { TaskWorkflow, TaskWorkflowProps } from "./TaskWorkflow";

/**
 * Storybook component configuration
 */
export default {
  title: "Workflows/TaskWorkflow",
  component: TaskWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<TaskWorkflowProps> = (args) => (
  <TaskWorkflow {...args}>
    <Task title="task #1" status="review" icon="arts & culture" />
    <Task title="task #2" status="review" icon="policy & government" />
    <Task title="task #3" icon="recreation" />
    <Task title="task #4" icon="college & career" />
    <Task title="task #5" icon="volunteer" />
    <Task title="task #6" icon="sponsored" />
  </TaskWorkflow>
);

/**
 * Component view
 */
export const Component: Story<TaskWorkflowProps> = Template.bind({});
Component.args = {};
