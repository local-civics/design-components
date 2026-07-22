import React from "react";
import { Story } from "@storybook/react";
import { BadgesCard, BadgesCardProps } from "./BadgesCard";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/BadgesCard",
  component: BadgesCard,
};

/**
 * Component storybook template
 */
const Template: Story<BadgesCardProps> = (args) => (
  <div style={{ width: 480 }}>
    <BadgesCard {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgesCardProps> = Template.bind({});
Component.args = {
  badges: [
    { badgeId: "1", displayName: "Community Leaders", finishedAt: "2024-01-01", level: 2 },
    { badgeId: "2", displayName: "Civic Action", startedAt: "2024-01-01", progress: 1, target: 3, level: 1 },
    { badgeId: "3", displayName: "Public Speaking", level: 0 },
    { badgeId: "4", displayName: "Service Learning", isLocked: true },
    { badgeId: "5", displayName: "Youth Advocacy", isLocked: true },
    { badgeId: "6", displayName: "Leadership Lab", isLocked: true },
  ],
};
