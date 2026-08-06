import React from "react";
import { Story } from "@storybook/react";
import { PathwayTranscript } from "./PathwayTranscript";
import { PathwayCardProps } from "../types";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/PathwayTranscript",
  component: PathwayTranscript,
};

/**
 * Component storybook template
 */
const Template: Story<PathwayCardProps> = (args) => (
  <div style={{ width: 800 }}>
    <PathwayTranscript {...args} />
  </div>
);

/**
 * In progress: mixed categories, mixed badge states, only completed activity renders
 */
export const Component: Story<PathwayCardProps> = Template.bind({});
Component.args = {
  studentName: "Jordan Rivera",
  studentEmail: "jordan.rivera@school.edu",
  schoolName: "Lincoln High School",
  gradeLevel: "11",
  title: "NYS Seal of Civic Readiness",
  description:
    "A pathway designed to account for student civic knowledge and civic experiences throughout middle and high school.",
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
  categoryParents: {
    "seal-of-civic-readiness": null,
    "civic-knowledge": "seal-of-civic-readiness",
    "civic-participation": "seal-of-civic-readiness",
  },
  badges: [
    {
      badgeId: "1",
      displayName: "Social Studies Courses",
      weight: 1,
      categories: ["seal-of-civic-readiness"],
    },
    {
      badgeId: "2",
      displayName: "Civics Course Enrollment",
      weight: 1,
      categories: ["civic-knowledge"],
    },
    {
      badgeId: "3",
      displayName: "Community Service Hours",
      weight: 2,
      categories: ["civic-participation"],
      completedAt: "2026-05-01T00:00:00Z",
    },
    {
      badgeId: "4",
      displayName: "Student Government Participation",
      weight: 1,
      categories: ["civic-participation"],
      startedAt: "2026-06-01T00:00:00Z",
    },
  ],
};

/**
 * Completed: every badge done, status pill reads Completed
 */
export const Completed: Story<PathwayCardProps> = Template.bind({});
Completed.args = {
  ...Component.args,
  points: {
    "civic-knowledge": 2,
    "civic-participation": 2,
    "seal-of-civic-readiness": 6,
  },
  badges: (Component.args.badges || []).map((b) => ({ ...b, completedAt: "2026-06-10T00:00:00Z" })),
};

/**
 * Empty: no activity yet, status pill reads Available
 */
export const Empty: Story<PathwayCardProps> = Template.bind({});
Empty.args = {
  ...Component.args,
  points: {
    "civic-knowledge": 0,
    "civic-participation": 0,
    "seal-of-civic-readiness": 0,
  },
  badges: (Component.args.badges || []).map((b) => ({ ...b, completedAt: undefined, startedAt: undefined })),
};
