import React from "react";
import { Onboarding, OnboardingProps } from "./Onboarding";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Onboarding/Onboarding",
  component: Onboarding,
};

/**
 * Component storybook template
 */
const Template: Story<OnboardingProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Onboarding givenName="Andre" {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<OnboardingProps> = Template.bind({});
Component.args = {};
