import { Story } from "@storybook/react";
import { AchievementWidget, AchievementWidgetProps } from "./AchievementWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Widgets/AchievementWidget",
  component: AchievementWidget,
};

/**
 * Component storybook template
 */
const Template: Story<AchievementWidgetProps> = (args) => (
  <AchievementWidget reflections={12} badges={3} milestones={7} {...args} />
);

/**
 * Component view
 */
export const Component: Story<AchievementWidgetProps> = Template.bind({});
Component.args = {};
