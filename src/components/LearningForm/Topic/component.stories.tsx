import React from "react";
import { Topic, TopicProps } from "./Topic";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
    title: "Library/LearningForm/Topic",
    component: Topic,
};

/**
 * Component storybook template
 */
const Template: Story<TopicProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <Topic
            headline="Watch Obi's Career Journey and answer the questions below as you watch/listen:"
            contentURL="https://www.youtube.com/embed/uUd_f7ymn18"
            {...args}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<TopicProps> = Template.bind({});
Component.args = {};