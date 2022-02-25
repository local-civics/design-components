import { Story } from "@storybook/react";
import { ActivityProgress, ActivityProgressProps } from "./ActivityProgress";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/ActivityProgress",
  component: ActivityProgress,
};

/**
 * Component storybook template
 */
const Template: Story<ActivityProgressProps> = (args) => <ActivityProgress {...args} />;

/**
 * Component view
 */
export const Component: Story<ActivityProgressProps> = Template.bind({});
Component.args = {};
