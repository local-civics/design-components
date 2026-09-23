import React from "react";
import { Story } from "@storybook/react";
import { SubmissionReviewHeader, SubmissionReviewHeaderProps } from "./SubmissionReviewHeader";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/SubmissionReviewHeader",
  component: SubmissionReviewHeader,
};

/**
 * Component storybook template
 */
const Template: Story<SubmissionReviewHeaderProps> = (args) => (
  <div style={{ width: 700 }}>
    <SubmissionReviewHeader {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<SubmissionReviewHeaderProps> = Template.bind({});
Component.args = {
  name: "Akinola Akintayo",
  email: "aapathwaystudent@localcivics.io",
};

export const NoAccountYet: Story<SubmissionReviewHeaderProps> = Template.bind({});
NoAccountYet.args = {
  email: "cacheaddtest@additiontest.edu",
};

export const LongName: Story<SubmissionReviewHeaderProps> = Template.bind({});
LongName.args = {
  name: "Alexandria Montgomery-Featherstonehaugh",
  email: "alexandria.montgomery.featherstonehaugh@localcivics.io",
};
