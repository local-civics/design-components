import React from "react";
import { Story } from "@storybook/react";
import { ValidationCenter, ValidationCenterProps } from "./ValidationCenter";
import { AdminProvider } from "../../providers/AdminProvider/AdminProvider";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/ValidationCenter",
  component: ValidationCenter,
};

const Template: Story<ValidationCenterProps> = (args) => (
  <AdminProvider>
    <ValidationCenter {...args} />
  </AdminProvider>
);

const classes = [
  { classId: "class-1", name: "Civics 101 - Period 3", active: true },
  { classId: "class-2", name: "Government - Period 5", active: false },
];

const badges = [
  {
    badgeId: "civic-leadership", displayName: "Civic Leadership Badge", pathwayId: "nys-seal-of-civic-readiness", pathwayName: "NYS Seal of Civic Readiness", points: 2,
    description: "Students lead a civic action project from idea to result: they identify a community need, build a plan with classmates and report what changed.\n\nEarned when the project reflection is approved.",
    lessonNames: ["Spotting a community need", "Planning with a team", "Taking action", "Reflecting on results"],
    href: "/badges/civic-leadership",
  },
  {
    badgeId: "seal-of-biliteracy", displayName: "Seal of Biliteracy", pathwayId: "nys-seal-of-biliteracy", pathwayName: "NYS Seal of Biliteracy", points: 1,
    description: "Recognizes students who have shown proficiency in English and at least one other language.",
    lessonNames: ["Language portfolio"], href: "/badges/seal-of-biliteracy",
  },
  {
    badgeId: "service-learning", displayName: "Service-Learning Project", pathwayId: "nys-seal-of-civic-readiness", pathwayName: "NYS Seal of Civic Readiness", points: 1,
    description: "A sustained service project connected to what the student is learning in class, with a written reflection.",
    lessonNames: ["Choose a service project", "Service log", "Final reflection"], href: "/badges/service-learning",
  },
  { badgeId: "career-exploration", displayName: "Career Exploration Badge", points: 8, href: "/badges/career-exploration" },
  { badgeId: "four-year-plan", displayName: "Four-Year Plan" },
];

/**
 * Component stories
 */
export const Component: Story<ValidationCenterProps> = Template.bind({});
Component.args = {
  loading: false,
  classId: "",
  classes,
  badgeId: "",
  badges,
  students: [],
};

export const Mock: Story<ValidationCenterProps> = Template.bind({});
Mock.args = {
  loading: false,
  classId: "",
  classes,
  badgeId: "civic-leadership",
  badges,
  students: [
    { userId: "jane-doe", name: "Jane Doe", hasCredit: true },
    { userId: "peter-pop", name: "Peter Pop", hasCredit: false },
    { userId: "jamal-rivera", name: "Jamal Rivera", hasCredit: false },
  ],
};

const roster = [
  { userId: "adrian-lopez", name: "Adrian Lopez", hasCredit: false },
  { userId: "ali-omanson", name: "Ali Omanson", hasCredit: false },
  { userId: "alison-swift", name: "Alison Swift", hasCredit: true },
  { userId: "aminat-sule", name: "Aminat Sule", hasCredit: false },
  { userId: "andy-springs", name: "Andy Springs", hasCredit: false },
  { userId: "brenda-cole", name: "Brenda Cole", hasCredit: true },
  { userId: "jane-drew", name: "Jane Drew", hasCredit: false },
  { userId: "noor-haddad", name: "Noor Haddad", hasCredit: false },
];

/**
 * Nothing chosen yet: the second step is dimmed until a badge is selected.
 */
export const NoBadgeChosen: Story<ValidationCenterProps> = Template.bind({});
NoBadgeChosen.args = { loading: false, classId: "", classes, badgeId: "", badges, students: [] };

/**
 * Choosing students one by one from one class.
 */
export const ChooseStudents: Story<ValidationCenterProps> = Template.bind({});
ChooseStudents.args = { loading: false, classId: "class-1", classes, badgeId: "service-learning", badges, students: roster };

/**
 * Crediting an entire class: the roster is read-only and shows who will be credited.
 */
export const EntireClass: Story<ValidationCenterProps> = Template.bind({});
EntireClass.args = { ...ChooseStudents.args, defaultScope: "class" };

/**
 * Entire class, with no class chosen yet.
 */
export const EntireClassNoClass: Story<ValidationCenterProps> = Template.bind({});
EntireClassNoClass.args = { ...ChooseStudents.args, defaultScope: "class", classId: "", students: [] };

/**
 * Everyone the educator can see, across all of their classes.
 */
export const AllMyStudents: Story<ValidationCenterProps> = Template.bind({});
AllMyStudents.args = { ...ChooseStudents.args, defaultScope: "all", classId: "" };

/**
 * An administrator: same page, wording says "All students" and "All classes".
 */
export const Administrator: Story<ValidationCenterProps> = Template.bind({});
Administrator.args = { ...AllMyStudents.args, isAdmin: true };

/**
 * Everyone already has credit: nothing to give, the button stays off.
 */
export const EveryoneCredited: Story<ValidationCenterProps> = Template.bind({});
EveryoneCredited.args = { ...ChooseStudents.args, students: roster.map((s) => ({ ...s, hasCredit: true })) };

/**
 * A class with no students.
 */
export const EmptyClass: Story<ValidationCenterProps> = Template.bind({});
EmptyClass.args = { ...ChooseStudents.args, students: [] };

/**
 * Roster still loading after a badge or class change.
 */
export const Loading: Story<ValidationCenterProps> = Template.bind({});
Loading.args = { ...ChooseStudents.args, loading: true, students: [] };

/**
 * Two classes named "Test Class" (as in the real Test Organization): the dropdown adds the
 * description, or the student count when there's no useful description, so they can be told apart.
 */
export const DuplicateClassNames: Story<ValidationCenterProps> = Template.bind({});
DuplicateClassNames.args = {
  ...Mock.args,
  classes: [
    { classId: "dup-1", name: "Test Class", description: "A PathLink Demo", numberOfStudents: 6, active: true },
    { classId: "dup-2", name: "Test Class", description: "", numberOfStudents: 6, active: false },
    { classId: "dup-3", name: "Grade 10", description: "Grade 10", numberOfStudents: 24, active: false },
    { classId: "dup-4", name: "Grade 10", numberOfStudents: 1, active: false },
    ...classes,
  ],
};
