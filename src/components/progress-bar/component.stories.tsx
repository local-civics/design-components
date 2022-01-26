import { ProgressBar, ProgressBarProps } from ".";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/ProgressBar",
  component: ProgressBar,
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
const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

/**
 * Component stories
 */
export const Default: Story<ProgressBarProps> = Template.bind({});
Default.args = {
  className: "h-8",
};
