import React from "react";
import { LearningFormWorkflow, LearningFormWorkflowProps } from "./LearningFormWorkflow";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
    title: "Workflow/LearningFormWorkflow",
    component: LearningFormWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<LearningFormWorkflowProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <LearningFormWorkflow
            activityHeadline="Tech Event Rewind: Careers in Philanthropy & The Arts with Obi Asiama"
            imageURL="https://cdn.localcivics.io/hub/landing.jpg"
            pathway="policy & government"
            xp={300}
            headline="Watch Obi's Career Journey and answer the questions below as you watch/listen:"
            contentURL="https://www.youtube.com/embed/uUd_f7ymn18"
            questions={[
                {
                    headline: "In your own words, describe what Obi does for work:",
                },
                {
                    headline: "What role has education played in Obi's life? Outside of traditional schools, where/how has Obi found opportunities to learn?",
                },
                {
                    headline: "What role has education played in Obi's life? Outside of traditional schools, where/how has Obi found opportunities to learn?",
                    options: ["Social Justice", "Transportation", "Health/Fitness", "Health/Fitness"],
                },
                {
                    headline: "Upload an image from the event you thought was interesting or new.",
                    imageRequired: true,
                },
            ]}
            {...args}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<LearningFormWorkflowProps> = Template.bind({});
Component.args = {};
