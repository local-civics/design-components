import React from "react";
import { Story } from "@storybook/react";
import { ActivityItem, ActivityItemProps } from "./ActivityItem";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Activity/ActivityItem",
  component: ActivityItem,
};

/**
 * Existing.
 */
export const Component: Story<ActivityItemProps> = (props) => (
  <ActivityItem
    headline="Item #1"
    pathway="policy & government"
    xp={250}
    imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
    {...props}
  />
);
