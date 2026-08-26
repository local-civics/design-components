import React from "react";
import { Story } from "@storybook/react";
import { FileLocker, FileLockerProps } from "./FileLocker";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/FileLocker",
  component: FileLocker,
};

/**
 * Component storybook template
 */
const Template: Story<FileLockerProps> = (args) => (
  <div style={{ width: 1000 }}>
    <FileLocker {...args} />
  </div>
);

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

/**
 * Component stories
 */
export const Component: Story<FileLockerProps> = Template.bind({});
Component.args = {
  loading: false,
  displayName: "File Locker",
  description: "Files and links you've submitted through your lessons",
  pathways: [
    { pathwayId: "civic1", title: "Civic Readiness", description: "Badges and lessons toward the Seal of Civic Readiness." },
    { pathwayId: "digital1", title: "Digital Citizenship" },
  ],
  badges: [
    { badgeId: "b1", displayName: "Community Leaders", categories: ["civic1category1"] },
    { badgeId: "b2", displayName: "Public Speaking", categories: ["civic1category2"] },
    { badgeId: "b3", displayName: "Network Fundamentals", categories: ["something-else"] },
  ],
  lessons: [
    { lessonId: "l1", lessonName: "Interviewing a Local Official" },
    { lessonId: "l2", lessonName: "Practice Speech Recording" },
    { lessonId: "l3", lessonName: "Setting Up a Home Network" },
  ],
  submissions: [
    {
      link: "https://cdn.localcivics.io/v1/store/objects/example1",
      lessonId: "l1",
      lessonName: "Interviewing a Local Official",
      badgeId: "b1",
      badgeName: "Community Leaders",
      pathwayName: "Civic Readiness",
      question: "Upload your interview recording",
      updatedAt: daysAgo(2),
    },
    {
      link: "https://drive.google.com/file/d/example2/view",
      lessonId: "l1",
      lessonName: "Interviewing a Local Official",
      badgeId: "b1",
      badgeName: "Community Leaders",
      pathwayName: "Civic Readiness",
      question: "Share a link to your written reflection",
      updatedAt: daysAgo(4),
    },
    {
      link: "https://cdn.localcivics.io/v1/store/objects/example3",
      lessonId: "l2",
      lessonName: "Practice Speech Recording",
      badgeId: "b2",
      badgeName: "Public Speaking",
      pathwayName: "Civic Readiness",
      question: "Upload your practice recording",
      updatedAt: daysAgo(20),
    },
    {
      link: "https://cdn.localcivics.io/v1/store/objects/example4",
      lessonId: "l3",
      lessonName: "Setting Up a Home Network",
      badgeId: "b3",
      badgeName: "Network Fundamentals",
      pathwayName: undefined,
      question: "Upload a photo of your network diagram",
      updatedAt: daysAgo(60),
    },
  ],
};

/**
 * Empty state - no submissions at all
 */
export const Empty: Story<FileLockerProps> = Template.bind({});
Empty.args = {
  ...Component.args,
  submissions: [],
};

/**
 * Loading state - matches useFileLocker()'s real behavior of keeping submissions empty until
 * the fetch resolves, rather than showing stale counts alongside a loading message.
 */
export const Loading: Story<FileLockerProps> = Template.bind({});
Loading.args = {
  ...Component.args,
  loading: true,
  submissions: [],
};
