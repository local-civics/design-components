import React from "react";
import { Story } from "@storybook/react";
import { FileLockerSearchModal, FileLockerSearchModalProps } from "./FileLockerSearchModal";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/FileLockerSearchModal",
  component: FileLockerSearchModal,
};

/**
 * Component storybook template
 */
const Template: Story<FileLockerSearchModalProps> = (args) => <FileLockerSearchModal {...args} />;

/**
 * Component stories
 */
export const Component: Story<FileLockerSearchModalProps> = Template.bind({});
Component.args = {
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
};
