import React from "react";
import { Form, FormProps } from "./Form";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
    title: "Library/LearningForm/Form",
    component: Form,
};

/**
 * Component storybook template
 */
const Template: Story<FormProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <Form {...args} />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<FormProps> = Template.bind({});
Component.args = {};
