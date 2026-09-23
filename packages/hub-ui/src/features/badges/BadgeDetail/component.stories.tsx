import React from "react";
import { Story } from "@storybook/react";
import { BadgeDetail, BadgeDetailProps } from "./BadgeDetail";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/BadgeDetail",
  component: BadgeDetail,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeDetailProps> = (args) => (
  <div style={{ width: 640 }}>
    <BadgeDetail {...args} />
  </div>
);

/**
 * In progress: one criterion done (Review), one not started (Start)
 */
export const Component: Story<BadgeDetailProps> = Template.bind({});
Component.args = {
  displayName: "Civic Action",
  level: 1,
  criteria: [
    { criterionId: "c1", displayName: "PD.FRPT.2f.1" },
    { criterionId: "c2", displayName: "PD.FRPT.2f.2" },
  ],
  choices: [
    {
      criterionId: "c1",
      activityName: "Leadership Course - Upload Project",
      xp: 250,
      completedAt: "2026-05-01T00:00:00Z",
      onClick: () => console.log("navigate to /lessons/1"),
    },
    {
      criterionId: "c2",
      activityName: "Leadership Course - Reflection",
      xp: 250,
      onClick: () => console.log("navigate to /lessons/2"),
    },
  ],
  onSubmit: () => console.log("submit badge"),
};

/**
 * A criterion with an in-progress (not yet completed) choice — shows "Continue"
 */
export const InProgress: Story<BadgeDetailProps> = Template.bind({});
InProgress.args = {
  ...Component.args,
  choices: [
    {
      criterionId: "c1",
      activityName: "Leadership Course - Upload Project",
      xp: 250,
      startedAt: "2026-05-01T00:00:00Z",
      onClick: () => console.log("navigate to /lessons/1"),
    },
    {
      criterionId: "c2",
      activityName: "Leadership Course - Reflection",
      xp: 250,
      onClick: () => console.log("navigate to /lessons/2"),
    },
  ],
};

/**
 * Educator reviewing a student's in-progress badge - same data as InProgress, but with `preview`
 * set: Submit is hidden (it's the student's own act, not the reviewer's), while each criterion's
 * own Start/Continue/Review button stays fully active, since those navigate to that same student's
 * other lesson previews.
 */
export const PreviewMode: Story<BadgeDetailProps> = Template.bind({});
PreviewMode.args = {
  ...InProgress.args,
  preview: true,
};

/**
 * Completed badge: no Submit button, both criteria show Review
 */
export const Completed: Story<BadgeDetailProps> = Template.bind({});
Completed.args = {
  ...Component.args,
  finishedAt: "2026-05-14T00:00:00Z",
  choices: [
    {
      criterionId: "c1",
      activityName: "Leadership Course - Upload Project",
      xp: 250,
      completedAt: "2026-05-01T00:00:00Z",
      onClick: () => console.log("navigate to /lessons/1"),
    },
    {
      criterionId: "c2",
      activityName: "Leadership Course - Reflection",
      xp: 250,
      completedAt: "2026-05-10T00:00:00Z",
      onClick: () => console.log("navigate to /lessons/2"),
    },
  ],
};
