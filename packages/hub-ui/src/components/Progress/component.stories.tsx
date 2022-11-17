import { Progress, ProgressProps } from "./Progress";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Progress",
  component: Progress,
  argTypes: {
    start: {
      defaultValue: 5,
    },
    end: {
      defaultValue: 10,
    },
  },
};

/**
 * Component storybook template
 */
const Template: Story<ProgressProps> = (args) => <Progress {...args} />;

/**
 * Component stories
 */
export const Component: Story<ProgressProps> = Template.bind({});
Component.args = {};
