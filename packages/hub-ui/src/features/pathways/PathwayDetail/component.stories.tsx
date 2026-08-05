import React from "react";
import { Story } from "@storybook/react";
import { PathwayDetail, PathwayDetailProps } from "./PathwayDetail";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/PathwayDetail",
  component: PathwayDetail,
};

/**
 * Component storybook template
 */
const Template: Story<PathwayDetailProps> = (args) => (
  <div style={{ width: 640 }}>
    <PathwayDetail {...args} onBack={() => console.log("navigate to /my-pathways")} />
  </div>
);

/**
 * In progress: mixed categories, mixed badge states
 */
export const Component: Story<PathwayDetailProps> = Template.bind({});
Component.args = {
  title: "NYS Seal of Civic Readiness",
  description:
    "A pathway designed to account for student civic knowledge and civic experiences throughout middle and high school.",
  displayTags: ["NYS_SEAL", "Civic Skills", "High School"],
  rawCriteria: {
    "civic-knowledge": 2,
    "civic-participation": 2,
    "seal-of-civic-readiness": 6,
  },
  points: {
    "civic-knowledge": 0,
    "civic-participation": 1,
    "seal-of-civic-readiness": 1,
  },
  categoryNames: {
    "civic-knowledge": "Civic Knowledge",
    "civic-participation": "Civic Participation",
    "seal-of-civic-readiness": "Seal Of Civic Readiness",
  },
  badges: [
    {
      badgeId: "1",
      displayName: "Social Studies Courses",
      weight: 1,
      categories: ["seal-of-civic-readiness"],
      onClick: () => console.log("navigate to /badges/1"),
    },
    {
      badgeId: "2",
      displayName: "Civics Course Enrollment",
      weight: 1,
      categories: ["civic-knowledge"],
      onClick: () => console.log("navigate to /badges/2"),
    },
    {
      badgeId: "3",
      displayName: "Community Service Hours",
      weight: 2,
      categories: ["civic-participation"],
      completedAt: "2026-05-01T00:00:00Z",
      onClick: () => console.log("navigate to /badges/3"),
    },
    {
      badgeId: "4",
      displayName: "Student Government Participation",
      weight: 1,
      categories: ["civic-participation"],
      startedAt: "2026-06-01T00:00:00Z",
      onClick: () => console.log("navigate to /badges/4"),
    },
  ],
};

/**
 * Available: nothing started yet
 */
export const Available: Story<PathwayDetailProps> = Template.bind({});
Available.args = {
  ...Component.args,
  badges: (Component.args.badges || []).map((b) => ({ ...b, completedAt: undefined, startedAt: undefined })),
};

/**
 * Completed: every badge done
 */
export const Completed: Story<PathwayDetailProps> = Template.bind({});
Completed.args = {
  ...Component.args,
  points: {
    "civic-knowledge": 2,
    "civic-participation": 2,
    "seal-of-civic-readiness": 6,
  },
  badges: (Component.args.badges || []).map((b) => ({ ...b, completedAt: "2026-06-10T00:00:00Z" })),
};
