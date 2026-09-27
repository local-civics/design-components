import * as React from "react";
import { Story } from "@storybook/react";
import { Comments, CommentsProps } from "./Comments";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Comments",
  component: Comments,
};

const Template: Story<CommentsProps> = (args) => (
  <div style={{ maxWidth: 480 }}>
    <Comments {...args} />
  </div>
);

/**
 * Covers every state a real comment can be in: an unresolved requires-validation comment on a
 * badge (gold border + "Needs validation" pill, but only a plain "View" button - study blocks
 * resubmitting until the comment is resolved), resolved ones whose badge/lesson still needs
 * resubmitting (the gold "Resubmit" CTA), one that's fully resolved, a plain lesson comment, and a
 * general comment (no target, no action).
 */
export const Component: Story<CommentsProps> = Template.bind({});
Component.args = {
  loading: false,
  comments: [
    {
      commentId: "c1",
      commenterName: "Your educator",
      badgeId: "b1",
      badgeName: "Service-Learning Project",
      requireValidation: true,
      commentText: "This looks like it's missing your reflection - please add it and resubmit.",
      createdAt: new Date().toISOString(),
    },
    {
      commentId: "c2",
      commenterName: "Your educator",
      badgeId: "b2",
      badgeName: "Political Party Project",
      requireValidation: true,
      resolvedAt: new Date().toISOString(),
      commentText: "Thanks for the update - this is resolved now.",
      createdAt: new Date().toISOString(),
    },
    {
      commentId: "c2b",
      commenterName: "Your educator",
      badgeId: "b3",
      badgeName: "Community Leaders",
      requireValidation: true,
      resolvedAt: new Date().toISOString(),
      needsSubmission: true,
      commentText: "Resolved - resubmit the badge once you've added your interview notes.",
      createdAt: new Date().toISOString(),
    },
    {
      commentId: "c2c",
      commenterName: "Your educator",
      badgeId: "b3",
      badgeName: "Community Leaders",
      lessonId: "l2",
      lessonName: "Interviewing a Local Leader",
      requireValidation: true,
      resolvedAt: new Date().toISOString(),
      needsSubmission: true,
      commentText: "Resolved - resubmit this lesson with your updated answers.",
      createdAt: new Date().toISOString(),
    },
    {
      commentId: "c3",
      commenterName: "Your educator",
      lessonId: "l1",
      lessonName: "Complete a Service-Learning Project",
      requireValidation: false,
      commentText: "Great work on this lesson!",
      createdAt: new Date().toISOString(),
    },
    {
      commentId: "c4",
      commenterName: "Your educator",
      requireValidation: false,
      commentText: "Keep up the good work this semester.",
      createdAt: new Date().toISOString(),
    },
  ],
  onBadgeClick: (id: string) => console.log("navigate to badge", id),
  onLessonClick: (id: string) => console.log("navigate to lesson", id),
};

/**
 * Empty state.
 */
export const Empty: Story<CommentsProps> = Template.bind({});
Empty.args = { loading: false, comments: [] };
