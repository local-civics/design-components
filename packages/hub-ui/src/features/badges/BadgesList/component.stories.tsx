import React from "react";
import { Story } from "@storybook/react";
import { BadgesList, BadgesListProps } from "./BadgesList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/BadgesList",
  component: BadgesList,
};

/**
 * Component storybook template
 */
const Template: Story<BadgesListProps> = (args) => (
  <div style={{ width: 1000 }}>
    <BadgesList {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgesListProps> = Template.bind({});
Component.args = {
  badges: [
    {
      badgeId: "1",
      displayName: "Community Leaders",
      level: 2,
      finishedAt: "2026-05-12T00:00:00Z",
      startedAt: "2026-04-01T00:00:00Z",
      onOpen: () => console.log("navigate to /badges/1"),
    },
    {
      badgeId: "2",
      displayName: "Civic Action",
      level: 1,
      startedAt: "2026-06-01T00:00:00Z",
      progress: 0.6,
      onOpen: () => console.log("navigate to /badges/2"),
    },
    {
      badgeId: "3",
      displayName: "Public Speaking",
      level: 0,
      onOpen: () => console.log("navigate to /badges/3"),
    },
    {
      badgeId: "4",
      displayName: "Service Learning",
      level: 2,
      finishedAt: "2026-04-30T00:00:00Z",
      startedAt: "2026-04-01T00:00:00Z",
      onOpen: () => console.log("navigate to /badges/4"),
    },
    {
      badgeId: "5",
      displayName: "Youth Advocacy",
      level: 1,
      isLocked: true,
    },
    {
      badgeId: "6",
      displayName: "Leadership Lab",
      level: 1,
      startedAt: "2026-06-10T00:00:00Z",
      progress: 0.4,
      onOpen: () => console.log("navigate to /badges/6"),
    },
    {
      badgeId: "7",
      displayName: "Digital Citizenship",
      level: 1,
      finishedAt: "2026-03-15T00:00:00Z",
      startedAt: "2026-03-01T00:00:00Z",
      onOpen: () => console.log("navigate to /badges/7"),
    },
    {
      badgeId: "8",
      displayName: "Network Fundamentals",
      level: 0,
      onOpen: () => console.log("navigate to /badges/8"),
    },
    {
      badgeId: "9",
      displayName: "Data Privacy",
      level: 1,
      isLocked: true,
    },
    {
      badgeId: "10",
      displayName: "Onboarding Badge",
      finishedAt: "2026-01-01T00:00:00Z",
      onOpen: () => console.log("navigate to /badges/10"),
    },
  ],
};

/**
 * Empty state
 */
export const Empty: Story<BadgesListProps> = Template.bind({});
Empty.args = {
  badges: [],
};
