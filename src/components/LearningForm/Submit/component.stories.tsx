import React from "react";
import { Submit, SubmitProps } from "./Submit";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
    title: "Library/LearningForm/Submit",
    component: Submit,
};

/**
 * Component storybook template
 */
const Template: Story<SubmitProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <Submit {...args} />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<SubmitProps> = Template.bind({});
Component.args = {};