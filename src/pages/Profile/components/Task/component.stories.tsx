import { Story } from "@storybook/react";
import { Task, TaskProps } from "./Task";

/**
 * Storybook component configuration
 */
export default {
  title: "Profile/Task",
  component: Task,
};

/**
 * Component storybook template
 */
const Template: Story<TaskProps> = (args) => <Task title="A task" {...args} />;

/**
 * Component view
 */
export const Component: Story<TaskProps> = Template.bind({});
Component.args = {};
