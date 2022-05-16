import { Story } from "@storybook/react";
import { Forms, FormsProps } from "./Forms";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/Task",
  component: Task,
};

/**
 * Component storybook template
 */
const Template: Story<FormsProps> = (args) => <Forms title="Form" {...args} />;

/**
 * Component view
 */
export const Component: Story<TaskProps> = Template.bind({});
Component.args = {};