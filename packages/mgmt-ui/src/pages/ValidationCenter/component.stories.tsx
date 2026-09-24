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
  { badgeId: "civic-leadership", displayName: "Civic Leadership Badge" },
  { badgeId: "seal-of-biliteracy", displayName: "Seal of Biliteracy" },
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
