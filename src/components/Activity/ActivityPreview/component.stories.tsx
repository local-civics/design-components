import { Story } from "@storybook/react";
import React from "react";
import { ActivityPreview, ActivityPreviewProps } from "./ActivityPreview";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Explore/Activity",
  component: ActivityPreview,
};

/**
 * Existing.
 */
export const Component: Story<ActivityPreviewProps> = (props) => (
  <ActivityPreview
    headline="EventPreview #1"
    pathway="policy & government"
    xp={250}
    imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
    {...props}
  />
);
