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
    <div className="font-proxima m-auto">
        <Form
            headline="College Explorer Scavenger Hunt (CUNY)"
            summary={`Undergrad Spotlights are an opportunity to learn about different colleges and universities from the people who know them best— current students! Hear their thoughts on the college search & applications, choosing a major, and more.

In this Undergrad Spotlight, Sam Lee shares about her Cornell experience! Sam discusses the importance of authenticity in an application, how homework in college differs from high school, and her life studying engineering/information science in Ithaca.
`}
            imageURL="https://cdn.localcivics.io/hub/landing.jpg"
            eta="30m"
            {...args}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<FormProps> = Template.bind({});
Component.args = {};
