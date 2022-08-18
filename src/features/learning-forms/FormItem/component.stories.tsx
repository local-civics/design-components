import React from "react";
import { Story } from "@storybook/react";
import { FormItem, FormItemProps } from "./FormItem";

/**
 * Storybook component configuration
 */
export default {
  title: "Learning Forms/FormItem",
  component: FormItem,
};

/**
 * Component storybook template
 */
const Template: Story<FormItemProps> = (args) => (
  <div className="font-proxima m-auto">
    <FormItem
      displayName="A sample headline"
      description="A sample description or otherwise additional aid"
      options={["Option 1", "Option 2", "Option 3"]}
      url="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?cs=srgb&dl=pexels-pixabay-301920.jpg&fm=jpg"
      {...args}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<FormItemProps> = Template.bind({});
Component.args = {};
