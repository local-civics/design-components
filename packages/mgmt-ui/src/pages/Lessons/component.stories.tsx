import * as React              from "react";
import {MemoryRouter}          from "react-router-dom";
import {Lessons, LessonsProps} from "./Lessons";
import { Story }               from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Lessons",
  component: Lessons,
};

/**
 * Component storybook template
 */
const Template: Story<LessonsProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Lessons
                {...args}
                lessons={args.lessons || []}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<LessonsProps> = Template.bind({});
Component.args = {};

/**
 * Mock stories
 */
export const Mock: Story<LessonsProps> = Template.bind({});
Mock.args = {
    lessons: [
        {
            lessonId: "1",
            name: "Understanding Local Government",
            description: "Explore how city councils and school boards make decisions.",
            pathway: "Civic Readiness",
            href: "",
        },
        {
            lessonId: "2",
            name: "Writing to Your Representative",
            description: "Draft a letter advocating for a cause you care about.",
            pathway: "Civic Readiness",
            href: "",
        },
        {
            lessonId: "3",
            name: "Media Literacy Basics",
            description: "Identify bias and credibility in news sources.",
            pathway: "",
            href: "",
        },
    ],
};
