import * as React from "react";
import {SubmissionCommentPanel, SubmissionCommentPanelProps} from "./SubmissionCommentPanel";
import {Story} from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Components/SubmissionCommentPanel",
  component: SubmissionCommentPanel,
};

/**
 * Component storybook template
 */
const Template: Story<SubmissionCommentPanelProps> = (args) => (
  <div style={{maxWidth: 700}}>
    <SubmissionCommentPanel {...args} />
  </div>
);

/**
 * Empty thread, badge-page shape (a "Credit This Badge" action present, not yet credited)
 */
export const Empty: Story<SubmissionCommentPanelProps> = Template.bind({});
Empty.args = {
  comments: [],
  userId: "student-1",
  initialBadgeId: "badge-1",
  badges: [{badgeId: "badge-1", displayName: "Civic Leadership Badge"}],
  lessons: [
    {lessonId: "lesson-1", displayName: "Local Government 101"},
    {lessonId: "lesson-2", displayName: "Community Service Reflection"},
  ],
  badgeValidated: false,
};

/**
 * A resolved comment, an unresolved one requiring validation, and a just-added (isLocal) one -
 * confirms the "Mark Resolved" action correctly disappears only for the local one.
 */
export const Mock: Story<SubmissionCommentPanelProps> = Template.bind({});
Mock.args = {
  comments: [
    {
      commentId: "c1",
      commentText: "Great work on this badge - approved!",
      requireValidation: false,
      authorName: "Ms. Rivera",
      createdAt: "2026-09-10T12:00:00Z",
    },
    {
      commentId: "c2",
      commentText: "This needs another look before it can be resubmitted.",
      requireValidation: true,
      authorName: "Mr. Alvarez",
      createdAt: "2026-09-12T09:30:00Z",
    },
    {
      commentId: "c3",
      commentText: "Already resolved, should show a confirmed state and no action.",
      requireValidation: true,
      resolvedAt: "2026-09-14T15:00:00Z",
      authorName: "Ms. Rivera",
      createdAt: "2026-09-13T11:00:00Z",
    },
    {
      commentId: "local-1",
      commentText: "Just left this - no real commentId yet, so Mark Resolved should be hidden.",
      requireValidation: true,
      authorName: "You",
      createdAt: new Date().toISOString(),
      isLocal: true,
    },
  ],
  userId: "student-1",
  initialBadgeId: "badge-1",
  badges: [{badgeId: "badge-1", displayName: "Civic Leadership Badge"}],
  lessons: [
    {lessonId: "lesson-1", displayName: "Local Government 101"},
    {lessonId: "lesson-2", displayName: "Community Service Reflection"},
  ],
  badgeValidated: false,
};

/**
 * Lesson-page shape - no onValidateBadge at all (no lesson-crediting equivalent exists), and the
 * "Badge" target has zero options (an unbadged lesson), so LeaveCommentModal should disable it.
 */
export const LessonPageNoBadge: Story<SubmissionCommentPanelProps> = Template.bind({});
LessonPageNoBadge.args = {
  comments: [],
  userId: "student-1",
  initialLessonId: "lesson-3",
  badges: [],
  lessons: [{lessonId: "lesson-3", displayName: "Standalone Civics Lesson"}],
};
