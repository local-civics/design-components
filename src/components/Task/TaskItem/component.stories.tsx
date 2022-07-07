import { Story }                      from "@storybook/react";
import { TaskItem, TaskItemProps } from "./TaskItem";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Task/TaskItem",
  component: TaskItem,
};

/**
 * Component storybook template
 */
const Template: Story<TaskItemProps> = (args) => <TaskItem headline="A task" {...args} />;

/**
 * Component view
 */
export const Component: Story<TaskItemProps> = Template.bind({});
Component.args = {};
