import * as React from "react";
import { Badge, BadgeProps } from "./Badge";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Badges/Badge",
  component: Badge,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <Badge
      displayName="College Explorer"
      startedAt="2020-12-22T02:53:05.929149Z"
      icon="award ribbon"
      summary="Build foundational knowledge about the college process, and learn from college students."
      criteria={[
        {
          displayName: "Live Workshop",
        },
        {
          displayName: "Self-Led Lesson",
        },
        {
          displayName: "Guest Speaker",
        },
        {
          displayName: "Scavenger Hunt",
        },
      ]}
      choices={[
        {
          activityName: "Scavenger Hunt (CUNY)",
          xp: 300,
          completedAt: "2020-12-22T02:53:05.929149Z",
        },
        {
          activityName: "Career Talk: Percee Goings",
          xp: 300,
        },
        {
          activityName: "Scavenger Hunt (FIT)",
          xp: 300,
        },
        {
          activityName: "Power Mapping",
          xp: 300,
        },
      ]}
      {...args}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeProps> = Template.bind({});
Component.args = {};
