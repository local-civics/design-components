import React from "react";
import { Story } from "@storybook/react";
import { CommentCenter, CommentCenterProps } from "./CommentCenter";
import { AdminProvider } from "../../providers/AdminProvider/AdminProvider";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/CommentCenter",
  component: CommentCenter,
};

/**
 * Component storybook template - wrapped in AdminProvider since real usage renders a
 * showNotification()/openConfirmModal()-style toast/modal portal at the true app root (see
 * Class/component.stories.tsx's identical gap for the same reason).
 */
const Template: Story<CommentCenterProps> = (args) => (
  <AdminProvider>
    <CommentCenter {...args} />
  </AdminProvider>
);

const classes = [
  { classId: "class-1", name: "Civics 101 - Period 3", active: true },
  { classId: "class-2", name: "Government - Period 5", active: false },
];

const students = [
  { userId: "jane-doe", name: "Jane Doe", email: "jane.doe@localcivics.io" },
  { userId: "peter-pop", name: "Peter Pop", email: "peter.pop@localcivics.io" },
];

const badges = [{ badgeId: "civic-leadership", displayName: "Civic Leadership Badge" }];
const lessons = [{ lessonId: "local-gov-101", displayName: "Local Government 101" }];

/**
 * Component stories
 */
export const Component: Story<CommentCenterProps> = Template.bind({});
Component.args = {
  loading: false,
  classId: "",
  classes,
  comments: [],
  students,
  badges,
  lessons,
};

export const Mock: Story<CommentCenterProps> = Template.bind({});
Mock.args = {
  loading: false,
  classId: "",
  classes,
  students,
  badges,
  lessons,
  comments: [
    {
      commentId: "c1",
      recipientId: "jane-doe",
      recipientName: "Jane Doe",
      authorId: "teacher-1",
      commenterName: "Ms. Rivera",
      badgeId: "civic-leadership",
      badgeName: "Civic Leadership Badge",
      commentText: "Great work on this badge - approved!",
      requireValidation: false,
      createdAt: "2026-09-10T12:00:00Z",
    },
    {
      commentId: "c2",
      recipientId: "peter-pop",
      recipientName: "Peter Pop",
      authorId: "teacher-1",
      commenterName: "Mr. Alvarez",
      lessonId: "local-gov-101",
      lessonName: "Local Government 101",
      commentText: "This needs another look before it can be resubmitted.",
      requireValidation: true,
      createdAt: "2026-09-12T09:30:00Z",
    },
    {
      commentId: "c3",
      recipientId: "jane-doe",
      recipientName: "Jane Doe",
      authorId: "teacher-1",
      commenterName: "Ms. Rivera",
      badgeId: "civic-leadership",
      badgeName: "Civic Leadership Badge",
      commentText: "Already resolved, should show a confirmed state and no action.",
      requireValidation: true,
      resolvedAt: "2026-09-14T15:00:00Z",
      createdAt: "2026-09-13T11:00:00Z",
    },
    {
      commentId: "local-c4",
      recipientId: "peter-pop",
      recipientName: "Peter Pop",
      authorId: "teacher-1",
      commenterName: "You",
      commentText: "Just left this - no real commentId yet, so Resolve should show Pending instead.",
      requireValidation: true,
      createdAt: new Date().toISOString(),
      isLocal: true,
    },
    {
      // A second student on the same badge as c1/c3 - exercises the "By badge" tab's group
      // spanning multiple students, so a click here should seed a real 2-student grading queue.
      commentId: "c5",
      recipientId: "peter-pop",
      recipientName: "Peter Pop",
      authorId: "teacher-1",
      commenterName: "Ms. Rivera",
      badgeId: "civic-leadership",
      badgeName: "Civic Leadership Badge",
      commentText: "Also on track for this badge.",
      requireValidation: false,
      createdAt: "2026-09-11T10:00:00Z",
    },
  ],
};

export const WithStudentClick: Story<CommentCenterProps> = Template.bind({});
WithStudentClick.args = {
  ...Mock.args,
  onStudentClick: (userId, context) =>
    console.log(`navigate to student ${userId}`, context),
};
