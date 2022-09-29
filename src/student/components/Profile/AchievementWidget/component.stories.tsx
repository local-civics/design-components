import { Story }                                     from "@storybook/react";
import { AchievementWidget, AchievementWidgetProps } from "./AchievementWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/AchievementWidget",
  component: AchievementWidget,
};

/**
 * Component storybook template
 */
const Template: Story<AchievementWidgetProps> = (args) => (
  <AchievementWidget lessonsCompleted={30} badgesEarned={3} civicMilestones={17} serviceHours={70} {...args} />
);

/**
 * Component view
 */
export const Component: Story<AchievementWidgetProps> = Template.bind({});
Component.args = {};
