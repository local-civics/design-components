import React from "react";
import { OnboardingWorkflow, OnboardingWorkflowProps } from "./OnboardingWorkflow";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Workflow/OnboardingWorkflow",
  component: OnboardingWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<OnboardingWorkflowProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <OnboardingWorkflow givenName="Andre" {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<OnboardingWorkflowProps> = Template.bind({});
Component.args = {};
