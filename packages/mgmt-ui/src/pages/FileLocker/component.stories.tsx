import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import {FileLocker, FileLockerProps} from "./FileLocker";
import {Story} from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/FileLocker",
  component: FileLocker,
};

const now = new Date()
const daysAgo = (n: number) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000).toISOString()

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

const STUDENTS = [
    {
        userId: "u1", avatar: "", name: "Adrian Lopez", email: "adrianlopez@localcivics.io",
        submissions: [
            {link: "https://cdn.localcivics.io/store/1", badgeName: "Service-Learning Project", badgeId: "b1", lessonName: "Complete a Service-Learning Project", question: "Submit your essay or presentation here.", updatedAt: daysAgo(1)},
            {link: "https://cdn.localcivics.io/store/2", badgeName: "Political Party Project", badgeId: "b2", lessonName: "Party Platform Project Submission", question: "Submit your project slides here.", updatedAt: daysAgo(3)},
        ],
    },
    {
        userId: "u2", avatar: "", name: "Brenda Cole", email: "bcole@localcivics.io",
        submissions: [
            {link: "https://cdn.localcivics.io/store/3", badgeName: "Service-Learning Project", badgeId: "b1", lessonName: "Complete a Service-Learning Project", question: "Submit your essay or presentation here.", updatedAt: daysAgo(10)},
        ],
    },
    {
        userId: "u3", avatar: "", name: "Chen Wu", email: "cwu@localcivics.io",
        submissions: [
            {link: "https://cdn.localcivics.io/store/4", badgeName: "Biliteracy Portfolio", badgeId: "b3", lessonName: "Biliteracy Portfolio Submission", question: "Submit your portfolio here.", updatedAt: daysAgo(20)},
            {link: "https://cdn.localcivics.io/store/5", badgeName: "Biliteracy Portfolio", badgeId: "b3", lessonName: "Biliteracy Portfolio Submission", question: "Submit your reflection here.", updatedAt: daysAgo(45)},
        ],
    },
    {
        userId: "u4", avatar: "", name: "Dana Reyes", email: "dreyes@localcivics.io",
        submissions: [],
    },
]

/**
 * Component storybook template
 */
const Template: Story<FileLockerProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <FileLocker
                {...args}
                displayName={args.displayName || "File Locker"}
                description={args.description || "All student file submissions"}
                classes={args.classes || []}
                lessons={args.lessons || LESSONS}
                classId={args.classId || ""}
                students={args.students || STUDENTS}
                pathways={args.pathways || PATHWAYS}
                badges={args.badges || BADGES}
                href={args.href || ""}
                onBackClick={args.onBackClick || (() => {})}
                onClassChange={args.onClassChange || (() => {})}
                onCopyLinkClick={args.onCopyLinkClick || (() => {})}
                onExportDataClick={args.onExportDataClick || (() => {})}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<FileLockerProps> = Template.bind({});
Component.args = {};

/**
 * Trial-account variant - single stat, no class selector/tabs/export.
 */
export const Trial: Story<FileLockerProps> = Template.bind({});
Trial.args = {
    trial: true,
    lessonsCompleted: 12,
};
