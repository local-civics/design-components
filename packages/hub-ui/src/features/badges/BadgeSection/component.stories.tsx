import React from "react";
import { Story } from "@storybook/react";
import { BadgeSection, BadgeSectionProps } from "./BadgeSection";

/**
 * Storybook component configuration
 */
export default {
  title: "Badges/BadgeSection",
  component: BadgeSection,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeSectionProps> = (args) => (
  <div className="w-full font-proxima m-auto">
    <BadgeSection
      {...args}
      badges={[
        {
          displayName: "College Explorer",
          icon: "formal scholar",
          startedAt: "2020-12-22T02:53:05.929149Z",
          progress: 8,
          target: 10,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Data Agent",
          icon: "formal molecule",
          startedAt: "2020-12-22T02:53:05.929149Z",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 4,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Civic Lens",
          icon: "formal camera lens",
          startedAt: "2020-12-22T02:53:05.929149Z",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 0,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "College Explorer",
          icon: "formal scholar",
          progress: 8,
          target: 10,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Data Agent",
          icon: "formal molecule",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 4,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Civic Lens",
          icon: "formal camera lens",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 0,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "College Explorer",
          icon: "formal scholar",
          isLocked: true,
          progress: 8,
          target: 10,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Data Agent",
          icon: "formal molecule",
          progress: 4,
          target: 10,
          isLocked: true,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Civic Lens",
          icon: "formal camera lens",
          progress: 0,
          target: 10,
          isLocked: true,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "College Explorer",
          icon: "formal scholar",
          startedAt: "2020-12-22T02:53:05.929149Z",
          finishedAt: "2020-12-22T02:53:05.929149Z",
          progress: 10,
          target: 10,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Data Agent",
          icon: "formal molecule",
          startedAt: "2020-12-22T02:53:05.929149Z",
          finishedAt: "2020-12-22T02:53:05.929149Z",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 10,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Civic Lens",
          icon: "formal camera lens",
          startedAt: "2020-12-22T02:53:05.929149Z",
          finishedAt: "2020-12-22T02:53:05.929149Z",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 10,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "College Explorer",
          icon: "formal scholar",
          startedAt: "2020-12-22T02:53:05.929149Z",
          progress: 8,
          target: 10,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Data Agent (Not Started)",
          icon: "formal molecule",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
            {
              activityName: "Scavenger Hunt (CUNY)",
              xp: 300,
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
          ],
        },
        {
          displayName: "Civic Lens",
          icon: "formal camera lens",
          startedAt: "2020-12-22T02:53:05.929149Z",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 0,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "College Explorer",
          icon: "formal scholar",
          progress: 8,
          target: 10,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Data Agent",
          icon: "formal molecule",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 4,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Civic Lens",
          icon: "formal camera lens",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 0,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "College Explorer",
          icon: "formal scholar",
          isLocked: true,
          progress: 8,
          target: 10,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Data Agent",
          icon: "formal molecule",
          progress: 4,
          target: 10,
          isLocked: true,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Civic Lens",
          icon: "formal camera lens",
          progress: 0,
          target: 10,
          isLocked: true,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "College Explorer",
          icon: "formal scholar",
          startedAt: "2020-12-22T02:53:05.929149Z",
          finishedAt: "2020-12-22T02:53:05.929149Z",
          progress: 10,
          target: 10,
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Data Agent",
          icon: "formal molecule",
          startedAt: "2020-12-22T02:53:05.929149Z",
          finishedAt: "2020-12-22T02:53:05.929149Z",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 10,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
        {
          displayName: "Civic Lens",
          icon: "formal camera lens",
          startedAt: "2020-12-22T02:53:05.929149Z",
          finishedAt: "2020-12-22T02:53:05.929149Z",
          summary: "Build foundational knowledge about the college process, and learn from college students.",
          progress: 10,
          target: 10,
          criteria: [
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
          ],
          choices: [
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
          ],
        },
      ]}
    />
  </div>
);

/**
 * Component stories
 */
export const FlexView: Story<BadgeSectionProps> = Template.bind({});
FlexView.args = {};

/**
 * Component stories
 */
export const GridView: Story<BadgeSectionProps> = Template.bind({});
GridView.args = {
  grid: true,
};

/**
 * Component stories
 */
export const FilterView: Story<BadgeSectionProps> = Template.bind({});
FilterView.args = {
  filters: [
    {
      label: "In Progress",
      isActive: true,
    },
    {
      label: "Completed"
    },
    {
      label: "Available"
    },
    {
      label: "Locked"
    }
  ],
  grid: false,
};
