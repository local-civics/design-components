import { Story } from "@storybook/react";
import { TaskPreview, TaskPreviewProps } from "./TaskPreview";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Task/TaskPreview",
  component: TaskPreview,
};

/**
 * Component storybook template
 */
const Template: Story<TaskPreviewProps> = (args) => <TaskPreview headline="A task" {...args} />;

/**
 * Component view
 */
export const Component: Story<TaskPreviewProps> = Template.bind({});
Component.args = {};
