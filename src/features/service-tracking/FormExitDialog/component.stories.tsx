import React from "react";
import { Story } from "@storybook/react";
import { FormExitDialog, FormExitDialogProps } from "./FormExitDialog";

/**
 * Storybook component configuration
 */
export default {
  title: "Service Tracking/FormExitDialog",
  component: FormExitDialog,
};

/**
 * Component storybook template
 */
const Template: Story<FormExitDialogProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <FormExitDialog {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<FormExitDialogProps> = Template.bind({});
Component.args = {};
