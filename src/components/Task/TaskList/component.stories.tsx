import { Story } from "@storybook/react";
import { Task } from "../../Profile/Task/Task";
import { TaskList, TaskListProps } from "./TaskList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/TaskList",
  component: TaskList,
};

/**
 * Component storybook template
 */
const Template: Story<TaskListProps> = (args) => (
  <TaskList {...args}>
    <Task title="task #1" status="review" />
    <Task title="task #2" status="review" />
    <Task title="task #3" />
    <Task title="task #4" />
    <Task title="task #5" />
    <Task title="task #6" />
  </TaskList>
);

/**
 * Component view
 */
export const Component: Story<TaskListProps> = Template.bind({});
Component.args = {};
