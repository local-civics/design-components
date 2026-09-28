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

/**
 * A file question whose answer is a file already uploaded to the platform: a "File uploaded ·
 * View" row, with the link box left empty for replacing it, instead of the raw storage address.
 */
export const FileUploaded: Story<FormItemProps> = Template.bind({});
FileUploaded.args = {
  format: "question",
  questionType: "file upload",
  required: true,
  responses: ["https://cdn.localcivics.io/v1/store/answers/example"],
};

/**
 * A file question answered with a pasted link: shown in the box as before.
 */
export const LinkPasted: Story<FormItemProps> = Template.bind({});
LinkPasted.args = {
  format: "question",
  questionType: "file upload",
  responses: ["https://docs.google.com/document/d/example"],
};
