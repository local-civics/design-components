import React from "react";
import { Question, QuestionProps } from "./Question";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
    title: "Library/LearningForm/Question",
    component: Question,
};

/**
 * Component storybook template
 */
const Template: Story<QuestionProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <Question
            freeForm
            headline="What role has education played in Obi's life? Outside of traditional schools, where/how has Obi found opportunities to learn?"
            options={["Social Justice", "Transportation", "Health/Fitness", "Health/Fitness"]}
            {...args}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<QuestionProps> = Template.bind({});
Component.args = {};