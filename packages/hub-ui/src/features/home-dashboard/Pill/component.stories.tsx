import React from "react";
import { Story } from "@storybook/react";
import { Pill, PillProps } from "./Pill";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Pill",
  component: Pill,
};

/**
 * Component storybook template
 */
const Template: Story<PillProps> = (args) => <Pill {...args} />;

/**
 * Component stories
 */
export const Component: Story<PillProps> = Template.bind({});
Component.args = {
  label: "Level 6",
  accent: "gold",
};
