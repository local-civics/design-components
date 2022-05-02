import React from "react";
import { Welcome, WelcomeProps } from "./Welcome";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Onboarding/Welcome",
  component: Welcome,
};

/**
 * Component storybook template
 */
const Template: Story<WelcomeProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Welcome givenName="Andre" {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<WelcomeProps> = Template.bind({});
Component.args = {};
