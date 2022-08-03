import React from "react";
import { Story } from "@storybook/react";
import { Form, FormProps } from "./Form";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/ServiceTracking/Form",
  component: Form,
};

/**
 * Component storybook template
 */
const Template: Story<FormProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Form
      {...args}
      onSubmit={async (value) => {
        args.onSubmit && (await args.onSubmit(value));
      }}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<FormProps> = Template.bind({});
Component.args = {};
