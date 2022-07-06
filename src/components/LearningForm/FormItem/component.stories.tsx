import React from "react";
import { Story } from "@storybook/react";
import { FormItem, FormItemProps } from "./FormItem";

/**
 * Storybook component configuration
 */
export default {
    title: "Library/LearningForm/FormItem",
    component: FormItem,
};

/**
 * Component storybook template
 */
const Template: Story<FormItemProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <FormItem {...args} />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<FormItemProps> = Template.bind({});
Component.args = {};
