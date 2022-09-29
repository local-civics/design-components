import React from "react";
import { Story }                     from "@storybook/react";
import { FormInput, FormInputProps } from "./FormInput";

/**
 * Storybook component configuration
 */
export default {
  title: "Student/Volunteering/FormInput",
  component: FormInput,
};

/**
 * Component storybook template
 */
const Template: Story<FormInputProps> = (args) => (
  <div className="font-proxima m-auto">
    <FormInput headline="A sample headline" placeholder="A sample placeholder" {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<FormInputProps> = Template.bind({});
Component.args = {};
