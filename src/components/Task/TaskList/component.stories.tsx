import { Story } from "@storybook/react";
import { TaskList, TaskListProps } from "./TaskList";
import { TaskItem } from "../TaskItem/TaskItem";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Task/TaskList",
  component: TaskList,
};

/**
 * Component storybook template
 */
const Template: Story<TaskListProps> = (args) => (
  <TaskList {...args}>
    <TaskItem headline="task #1" status="done" />
    <TaskItem headline="task #2" status="in-progress" />
    <TaskItem headline="task #3" />
    <TaskItem headline="task #4" />
    <TaskItem headline="task #5" />
    <TaskItem headline="task #6" />
  </TaskList>
);

/**
 * Component view
 */
export const Component: Story<TaskListProps> = Template.bind({});
Component.args = {};
