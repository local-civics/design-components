import React from "react";
import { Story }                     from "@storybook/react";
import { FormInput, FormInputProps } from "./FormInput";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Form/FormInput",
  component: FormInput,
};

/**
 * Component storybook template
 */
const Template: Story<FormInputProps> = (args) => (
  <div className="font-proxima m-auto">
    <FormInput
      displayName="Name"
      description="(Required)"
      placeholder="Insert your name"
      tagsValue={["1234"]}
      required
      minLength={10}
      {...args}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<FormInputProps> = Template.bind({});
Component.args = {};
