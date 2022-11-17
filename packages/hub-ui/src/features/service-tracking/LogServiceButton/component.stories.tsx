import React from "react";
import { LogServiceButton, LogServiceButtonProps } from "./LogServiceButton";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Service Tracking/LogServiceButton",
  component: LogServiceButton,
};

/**
 * Component storybook template
 */
const Template: Story<LogServiceButtonProps> = (args) => (
  <div className="font-proxima m-auto">
    <LogServiceButton {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<LogServiceButtonProps> = Template.bind({});
Component.args = {};
