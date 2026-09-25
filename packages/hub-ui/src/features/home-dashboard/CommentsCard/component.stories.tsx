import React from "react";
import { Story } from "@storybook/react";
import { CommentsCard, CommentsCardProps } from "./CommentsCard";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/CommentsCard",
  component: CommentsCard,
};

/**
 * Component storybook template
 */
const Template: Story<CommentsCardProps> = (args) => (
  <div style={{ width: 480 }}>
    <CommentsCard {...args} />
  </div>
);

/**
 * A mix of resolved, needing-validation, and plain comments, spanning both badges and lessons -
 * exercises all 3 stat cells, both type pills, and the recent-comment sort order.
 */
export const Component: Story<CommentsCardProps> = Template.bind({});
Component.args = {
  comments: [
    {
      commentId: "c1",
      commentText: "Great start on this badge - make sure to address the second criterion before resubmitting.",
      requireValidation: true,
      commenterName: "Your educator",
      createdAt: "2026-09-20T14:00:00Z",
      badgeId: "badge-1",
      badgeName: "Civic Leadership Badge",
    },
    {
      commentId: "c2",
      commentText: "Nice work on the reflection - approved.",
      requireValidation: true,
      resolvedAt: "2026-09-19T10:00:00Z",
      commenterName: "Your educator",
      createdAt: "2026-09-18T09:15:00Z",
      lessonId: "lesson-1",
      lessonName: "Local Government 101",
    },
    {
      commentId: "c3",
      commentText: "Just a note, no action needed here.",
      requireValidation: false,
      commenterName: "Your educator",
      createdAt: "2026-09-10T09:00:00Z",
      badgeId: "badge-2",
      badgeName: "Community Service Reflection",
    },
  ],
};

/**
 * No comments yet at all - the empty state.
 */
export const Empty: Story<CommentsCardProps> = Template.bind({});
Empty.args = {
  comments: [],
};

/**
 * The initial fetch hasn't resolved yet.
 */
export const Loading: Story<CommentsCardProps> = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
