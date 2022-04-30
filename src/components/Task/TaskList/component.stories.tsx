import { Story } from "@storybook/react";
import { TaskList, TaskListProps } from "./TaskList";
import {TaskPreview} from "../TaskPreview/TaskPreview";

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
    <TaskPreview headline="task #1" status="done" />
    <TaskPreview headline="task #2" status="in-progress" />
    <TaskPreview headline="task #3" />
    <TaskPreview headline="task #4" />
    <TaskPreview headline="task #5" />
    <TaskPreview headline="task #6" />
  </TaskList>
);

/**
 * Component view
 */
export const Component: Story<TaskListProps> = Template.bind({});
Component.args = {};
