import React from "react";
import { RoleSelection, RoleSelectionProps } from "./RoleSelection";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Onboarding/RoleSelection",
  component: RoleSelection,
};

/**
 * Component storybook template
 */
const Template: Story<RoleSelectionProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <RoleSelection {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<RoleSelectionProps> = Template.bind({});
Component.args = {};
