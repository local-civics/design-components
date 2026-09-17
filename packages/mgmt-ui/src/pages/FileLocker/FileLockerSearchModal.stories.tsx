import React from 'react';
import { Story } from "@storybook/react";
import { FileLockerSearchModal, FileLockerSearchModalProps } from "./FileLockerSearchModal";

/**
 * Storybook component configuration
 */
export default {
    title: "Pages/FileLocker/FileLockerSearchModal",
    component: FileLockerSearchModal,
};

const PATHWAYS = [
    {pathwayId: "p1", title: "Civic Readiness", description: "A pathway designed to account for student civic knowledge and civic experiences throughout middle and high school."},
    {pathwayId: "p2", title: "Seal of Biliteracy", description: "A pathway designed to highlight student skills in English and a second language other than English."},
]

const BADGES = [
    {badgeId: "b1", displayName: "Service-Learning Project", categories: ["p1:core"], lessonIds: ["l1"]},
    {badgeId: "b2", displayName: "Political Party Project", categories: ["p1:core"], lessonIds: ["l2"]},
    {badgeId: "b3", displayName: "Biliteracy Portfolio", categories: ["p2:core"], lessonIds: ["l3"]},
]

const LESSONS = [
    {lessonId: "l1", lessonName: "Complete a Service-Learning Project"},
    {lessonId: "l2", lessonName: "Party Platform Project Submission"},
    {lessonId: "l3", lessonName: "Biliteracy Portfolio Submission"},
]

/**
 * Component storybook template
 */
const Template: Story<FileLockerSearchModalProps> = (args) => <FileLockerSearchModal {...args} />;

/**
 * Component stories
 */
export const Component: Story<FileLockerSearchModalProps> = Template.bind({});
Component.args = {
    opened: true,
    pathways: PATHWAYS,
    badges: BADGES,
    lessons: LESSONS,
};
