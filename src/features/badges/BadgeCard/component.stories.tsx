import React from "react";
import { Story } from "@storybook/react";

import { Overlay } from "../../../components/Overlay";
import { BadgeCard, BadgeCardProps } from "./BadgeCard";

/**
 * Storybook component configuration
 */
export default {
  title: "Badges/BadgeCard",
  component: BadgeCard,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeCardProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Overlay>
      <BadgeCard
        imageURL="https://cdn.localcivics.io/badges/participation.png"
        displayName="Onboarding Badge"
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
    </Overlay>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeCardProps> = Template.bind({});
Component.args = {};
