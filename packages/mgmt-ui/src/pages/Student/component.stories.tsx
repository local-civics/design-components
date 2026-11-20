import * as React              from "react";
import {MemoryRouter}          from "react-router-dom";
import {Student, StudentProps} from "./Student";
import { Story }               from "@storybook/react";
import {OverviewPathway}   from "./overviewRules";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Student",
  component: Student,
};

/**
 * Component storybook template
 */
const Template: Story<StudentProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <MemoryRouter>
        <Student
            {...args}
            name={args.name || "Jane McDowell"}
            impactStatement={args.impactStatement || "I want to equip my students with transformational leadership skills so they could make impact in their communities!"}
            numberOfProblemsSolved={args.numberOfProblemsSolved || 17}
            percentageOfLessonsCompleted={args.percentageOfLessonsCompleted || 0}
            numberOfLessonsCompleted={args.numberOfLessonsCompleted || 0}
            badges={args.badges || []}
            lessons={args.lessons || []}
        />
      </MemoryRouter>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<StudentProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<StudentProps> = Template.bind({});
Mock.args = {
    hourEntries: [
        {
            entryId: "e1", revision: 1, userId: "u1", studentName: "Jane Doe", status: "pending",
            activityDate: "2026-11-02", hostName: "Rose Pantry", activityType: "Community Service", minutes: 150,
            description: "Sorted and packed donations for the weekend food drive.",
            contactPerson: "Pat Lee", contactEmail: "pat@example.org",
            supports: "Civic Readiness · 2b. Service-Learning Project", pathwayId: "civic-readiness", categoryId: "2b", pathwayTitle: "Civic Readiness", categoryName: "2b. Service-Learning Project",
            evidenceUrl: "https://cdn.localcivics.io/v1/store/example/proof.pdf", createdAt: "2026-11-03T14:20:00Z",
        },
        {
            entryId: "e3", revision: 1, userId: "u1", studentName: "Jane Doe", status: "pending",
            activityDate: "2026-11-01", hostName: "Spring Recital, Jefferson High Auditorium", activityType: "Composition", minutes: 90,
            description: "Performed my own arrangement of a Gershwin prelude.", createdAt: "2026-11-02T09:30:00Z",
        },
        {
            entryId: "e4", revision: 2, userId: "u1", studentName: "Jane Doe", status: "verified",
            activityDate: "2026-10-22", hostName: "Red Cross, Riverside Chapter", activityType: "Training", minutes: 360,
            description: "First aid and CPR certification course.", supports: "Civic Readiness · 2b. Service-Learning Project",
            pathwayId: "civic-readiness", categoryId: "2b", pathwayTitle: "Civic Readiness", categoryName: "2b. Service-Learning Project", createdAt: "2026-10-23T10:00:00Z",
        },
        {
            entryId: "e5", revision: 2, userId: "u1", studentName: "Jane Doe", status: "verified",
            activityDate: "2026-10-10", hostName: "Community Garden Co-op", activityType: "Community Service", minutes: 240,
            description: "Weekend work-based learning shift.",
            supports: "Civic Readiness · 2d. Extracurricular / Work-based Learning", pathwayId: "civic-readiness", categoryId: "2d",
            pathwayTitle: "Civic Readiness", categoryName: "2d. Extracurricular / Work-based Learning", createdAt: "2026-10-12T10:00:00Z",
        },
        {
            entryId: "e2", revision: 2, userId: "u1", studentName: "Jane Doe", status: "verified",
            activityDate: "2026-10-18", hostName: "Riverside Library", activityType: "Community Service", minutes: 45,
            description: "Ran the reading hour for first graders.", createdAt: "2026-10-19T10:00:00Z",
        },
    ],
    onApproveHour: () => new Promise((resolve) => setTimeout(resolve, 500)),
    onBulkApproveHours: () => new Promise((resolve) => setTimeout(resolve, 800)),
    onInvalidateHour: () => new Promise((resolve) => setTimeout(resolve, 500)),
    badges: [{
        badgeId: "unit-1",
        badgeName: "Unit 1 Badge",
        isComplete: true,
        pathwayId: "civic-readiness",
        pathwayName: "Civic Readiness",
        href: "",
    },{
        badgeId: "digital-citizen",
        badgeName: "Digital Citizenship Badge",
        isComplete: true,
        pathwayId: "digital-citizenship",
        pathwayName: "Digital Citizenship",
        href: "",
    },{
        // Exercises the "Other" pill and the pathway-pill row's overall gate - a badge with no
        // matching pathway, alongside two that do.
        badgeId: "unit-2",
        badgeName: "Unit 2 Badge",
        isComplete: false,
        href: "",
    }],
    lessons: [
        {
            // Submitted, with both questions and a reflection - the fullest case.
            lessonId: "lesson-1",
            lessonName: "An example lesson",
            badgeName: "Unit 1 Badge",
            pathwayId: "civic-readiness",
            pathwayName: "Civic Readiness",
            href: "",
            isComplete: true,
            hasResponses: true,
            questions: [
                {questionName: "An example question", answer: ["My example answer"]},
                {questionName: "A second question in the same lesson", answer: ["Another example answer"]},
                // Exercises AnswerValue: an uploaded file renders as a Download button.
                {questionName: "Upload your project file", answer: ["https://cdn.localcivics.io/v1/store/organizations/example/users/example/2oUT5srnypfmNxzPn2KHFz?version=example"]},
            ],
            reflection: "An example reflection",
            rating: 2,
        },
        {
            // In progress (not submitted), has responses, no reflection, no pathway match -
            // exercises "Other" and the "Has responses" filter without also being "Submitted".
            lessonId: "lesson-2",
            lessonName: "An unbadged lesson",
            href: "",
            isComplete: false,
            hasResponses: true,
            questions: [{questionName: "A standalone question", answer: ["A standalone answer"]}],
            reflection: "",
            rating: "",
        },
        {
            // Opened but nothing recorded yet - exercises the empty-state fallback and confirms
            // the "Has responses" filter correctly excludes it.
            lessonId: "lesson-3",
            lessonName: "A lesson with no responses yet",
            badgeName: "Digital Citizenship Badge",
            pathwayId: "digital-citizenship",
            pathwayName: "Digital Citizenship",
            href: "",
            isComplete: false,
            hasResponses: false,
            questions: [],
            reflection: "",
            rating: "",
        },
    ],
};

// ---------------------------------------------------------------------------------------------------------
// Overview tab. The data below mirrors the three review mockups (on track, blocked, early and inactive).
// Dates are written relative to the moment the story loads, so "no activity in N days" reads the same
// whenever it is opened.
// ---------------------------------------------------------------------------------------------------------

const daysAgoISO = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

const seal = (points: Record<string, number>, over: Partial<OverviewPathway> = {}): OverviewPathway => ({
    pathwayId: "seal",
    title: "NYS Seal of Civic Readiness",
    badgesCompleted: 0,
    badgesTotal: 12,
    started: true,
    criteria: {total: 6, knowledge: 2, participation: 2},
    points,
    categoryNames: {total: "Total points", knowledge: "Civic Knowledge", participation: "Civic Participation"},
    categoryParents: {total: null, knowledge: "total", participation: "total"},
    ...over,
})

const optics = (over: Partial<OverviewPathway> = {}): OverviewPathway => ({
    pathwayId: "optics",
    title: "Optics & Photonics Career Pathway",
    badgesCompleted: 3,
    badgesTotal: 8,
    started: true,
    criteria: {total: 20, certificates: 3},
    points: {total: 10, certificates: 2},
    categoryNames: {total: "College credits", certificates: "Certificates"},
    categoryParents: {total: null, certificates: "total"},
    ...over,
})

const overviewBadges = [
    {badgeId: "b1", badgeName: "Optics Lab Internship", isComplete: true, completedAt: daysAgoISO(5), pathwayId: "optics", pathwayName: "Optics & Photonics Career Pathway", href: ""},
    {badgeId: "b2", badgeName: "Polishing & Metrology", isComplete: true, completedAt: daysAgoISO(30), pathwayId: "optics", pathwayName: "Optics & Photonics Career Pathway", href: ""},
    {badgeId: "b3", badgeName: "Civic Leadership", isComplete: false, pathwayId: "seal", pathwayName: "NYS Seal of Civic Readiness", href: ""},
]

const overviewLessons = [
    {lessonId: "l1", lessonName: "OPT 210 Module", badgeName: "Polishing & Metrology", pathwayId: "optics", pathwayName: "Optics & Photonics Career Pathway", href: "", isComplete: true, finishedAt: daysAgoISO(11), hasResponses: true, questions: [], reflection: "", rating: ""},
    {lessonId: "l2", lessonName: "Co-op Placement Application", badgeName: "Optics Lab Internship", href: "", isComplete: false, updatedAt: daysAgoISO(2), answeredQuestions: 3, hasResponses: true, questions: [], reflection: "", rating: ""},
]

const overviewHours = [
    {entryId: "o1", revision: 1, userId: "u1", studentName: "Aminat Sule", status: "verified" as const, activityDate: "2026-09-10", hostName: "Photonics Lab", activityType: "Internship", minutes: 3600, createdAt: daysAgoISO(60)},
    {entryId: "o2", revision: 1, userId: "u1", studentName: "Aminat Sule", status: "pending" as const, activityDate: "2026-11-05", hostName: "Photonics Lab", activityType: "Internship", minutes: 180, createdAt: daysAgoISO(14)},
    {entryId: "o3", revision: 1, userId: "u1", studentName: "Aminat Sule", status: "pending" as const, activityDate: "2026-11-12", hostName: "Photonics Lab", activityType: "Internship", minutes: 120, createdAt: daysAgoISO(7)},
]

// Defaults a story can override; typed loosely because Storybook's args are always a full StudentProps.
const overviewDefaults: Partial<StudentProps> = {
    numberOfProblemsSolved: 24,
    numberOfLessonsCompleted: 1,
    badges: [],
    lessons: [],
    onBackClick: () => {},
    onViewPathway: () => {},
}

const OverviewTemplate: Story<StudentProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <MemoryRouter>
        <Student {...({...overviewDefaults, ...args} as StudentProps)} />
      </MemoryRouter>
  </div>
);

/**
 * On track: two pathways under way, hours waiting for approval, recent activity.
 */
export const OverviewOnTrack: Story<StudentProps> = OverviewTemplate.bind({});
OverviewOnTrack.args = {
    loading: false,
    name: "Aminat Sule",
    impactStatement: "Optics & Photonics dual-enrollment student, Grade 12.",
    badges: overviewBadges,
    lessons: overviewLessons,
    hourEntries: overviewHours,
    overview: {loading: false, pathways: [optics(), seal({total: 0, knowledge: 0, participation: 0}, {started: false, badgesCompleted: 0})]},
};

/**
 * Blocked: one requirement of the Seal has no points while another is met, and hours are waiting.
 */
export const OverviewBlocked: Story<StudentProps> = OverviewTemplate.bind({});
OverviewBlocked.args = {
    ...OverviewOnTrack.args,
    name: "Adrian Lopez",
    overview: {loading: false, pathways: [seal({total: 4, knowledge: 2, participation: 0}, {badgesCompleted: 4})]},
};

/**
 * Early and inactive: nothing done in a month.
 */
export const OverviewEarlyAndInactive: Story<StudentProps> = OverviewTemplate.bind({});
OverviewEarlyAndInactive.args = {
    loading: false,
    name: "Jane Drew",
    impactStatement: "",
    badges: [{badgeId: "b9", badgeName: "Digital Citizenship", isComplete: true, completedAt: daysAgoISO(40), pathwayId: "seal", pathwayName: "NYS Seal of Civic Readiness", href: ""}],
    lessons: [],
    hourEntries: [],
    overview: {loading: false, pathways: [seal({total: 1, knowledge: 1, participation: 0}, {badgesCompleted: 1})]},
};

/**
 * Nothing finished in six weeks, but a lesson was worked on two days ago: shown as recent activity, and the student is
 * not flagged as inactive. A lesson that was only opened (no answers saved) does not count.
 */
export const OverviewWorkInProgress: Story<StudentProps> = OverviewTemplate.bind({});
OverviewWorkInProgress.args = {
    loading: false,
    name: "Noor Haddad",
    impactStatement: "",
    badges: [{badgeId: "b9", badgeName: "Digital Citizenship", isComplete: true, completedAt: daysAgoISO(42), pathwayId: "seal", pathwayName: "NYS Seal of Civic Readiness", href: ""}],
    lessons: [
        {lessonId: "l7", lessonName: "Community Mapping", badgeName: "Civic Leadership", href: "", isComplete: false, updatedAt: daysAgoISO(2), answeredQuestions: 4, hasResponses: true, questions: [], reflection: "", rating: ""},
        {lessonId: "l8", lessonName: "Only Opened", badgeName: "Civic Leadership", href: "", isComplete: false, updatedAt: daysAgoISO(1), answeredQuestions: 0, hasResponses: false, questions: [], reflection: "", rating: ""},
    ],
    hourEntries: [],
    overview: {loading: false, pathways: [seal({total: 1, knowledge: 1, participation: 0}, {badgesCompleted: 1})]},
};

/**
 * A student who has done nothing yet.
 */
export const OverviewNoActivity: Story<StudentProps> = OverviewTemplate.bind({});
OverviewNoActivity.args = {
    loading: false,
    name: "New Student",
    impactStatement: "",
    badges: [],
    lessons: [],
    hourEntries: [],
    overview: {loading: false, pathways: []},
};

/**
 * Pathways still being fetched.
 */
export const OverviewLoading: Story<StudentProps> = OverviewTemplate.bind({});
OverviewLoading.args = {
    ...OverviewOnTrack.args,
    overview: {loading: true, pathways: []},
};
