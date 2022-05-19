import React from "react";
import { ConfirmExit, ConfirmExitProps } from "./ConfirmExit";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
    title: "Library/LearningForm/ConfirmExit",
    component: ConfirmExit,
};

/**
 * Component storybook template
 */
const Template: Story<ConfirmExitProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <ConfirmExit {...args} />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<ConfirmExitProps> = Template.bind({});
Component.args = {};