import React from "react";
import { Story } from "@storybook/react";
import { SubmissionQueueNav, SubmissionQueueNavProps } from "./SubmissionQueueNav";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/SubmissionQueueNav",
  component: SubmissionQueueNav,
};

/**
 * Component storybook template
 */
const Template: Story<SubmissionQueueNavProps> = (args) => (
  <div style={{ width: 700 }}>
    <SubmissionQueueNav {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<SubmissionQueueNavProps> = Template.bind({});
Component.args = {
  index: 3,
  total: 23,
  label: "Test Class",
  onPrevious: () => console.log("go to previous student"),
  onNext: () => console.log("go to next student"),
};

export const AtStart: Story<SubmissionQueueNavProps> = Template.bind({});
AtStart.args = {
  index: 0,
  total: 23,
  label: "Test Class",
  onNext: () => console.log("go to next student"),
};

export const AtEnd: Story<SubmissionQueueNavProps> = Template.bind({});
AtEnd.args = {
  index: 22,
  total: 23,
  label: "Test Class",
  onPrevious: () => console.log("go to previous student"),
};

export const NoLabel: Story<SubmissionQueueNavProps> = Template.bind({});
NoLabel.args = {
  index: 1,
  total: 5,
  onPrevious: () => console.log("go to previous student"),
  onNext: () => console.log("go to next student"),
};

// A queue of one (or zero) students renders nothing - there's no batch to step through.
export const SingleStudent: Story<SubmissionQueueNavProps> = Template.bind({});
SingleStudent.args = {
  index: 0,
  total: 1,
  onPrevious: () => console.log("go to previous student"),
  onNext: () => console.log("go to next student"),
};
