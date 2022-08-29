import React from "react";
import { Story }                                   from "@storybook/react";
import { FormSubmitDialog, FormSubmitDialogProps } from "./FormSubmitDialog";

/**
 * Storybook component configuration
 */
export default {
  title: "Student/Volunteering/FormSubmitDialog",
  component: FormSubmitDialog,
};

/**
 * Component storybook template
 */
const Template: Story<FormSubmitDialogProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <FormSubmitDialog {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<FormSubmitDialogProps> = Template.bind({});
Component.args = {};
