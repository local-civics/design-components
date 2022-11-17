import React from "react";
import { Registration, RegistrationProps } from "./Registration";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Onboarding/Registration",
  component: Registration,
};

/**
 * Component storybook template
 */
const Template: Story<RegistrationProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Registration {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<RegistrationProps> = Template.bind({});
Component.args = {};
