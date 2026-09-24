import * as React            from "react";
import {MemoryRouter}        from "react-router-dom";
import {Lesson, LessonProps} from "./Lesson";
import { Story }             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Lesson",
  component: Lesson,
};

/**
 * Component storybook template
 */
const Template: Story<LessonProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Lesson
                {...args}
                classes={args.classes || []}
                students={args.students || []}
                questions={args.questions || []}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<LessonProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<LessonProps> = Template.bind({});
Mock.args = {
    href: "",
    contributors: [{name: "Jane Doe"}, {name: "Peter Pop"}, {name: "Felona Moldova"}, {name: "Eric Bell"}, {name: "Jamie"}, {name: "Jo"}],
    students: [
        {
            // Exercises the "answers + reflection" render path - the richest, most common real
            // case now that reflection/rating join onto this same row.
            userId: "jane-doe-mock",
            avatar: "",
            href: "",
            name: "Jane Doe",
            email: "jane.doe@localcivics.io",
            // Exercises the "Submitted" status filter.
            isComplete: true,
            isStarted: true,
            reflection: "This lesson helped me understand how local government actually works.",
            rating: 4,
            answers: [{
                questionName: "An example question",
                answer: ["An example response"],
            },{
                questionName: "Another example question",
                answer: [],
            },{
                questionName: "A chart example question",
                answer: ["A. An example response"],
            }]
        },
        {
            // Exercises AnswerStack's truly-empty fallback (no answers, no reflection) - a real
            // case (e.g. a student who's done other work on the lesson but hasn't touched any
            // question-format item or the reflection prompt yet), confirming the row still expands
            // to a real, worded link instead of nothing.
            userId: "peter-pop-mock",
            avatar: "",
            href: "",
            name: "Peter Pop",
            email: "peter.pop@localcivics.io",
            // Exercises the "Active" status filter (started, not yet complete).
            isStarted: true,
            isComplete: false,
            answers: []
        },
        {
            // Exercises the "reflection only, no question answers" render path - a student who
            // reflected on the lesson without ever touching a question-format item. Left with
            // neither isStarted nor isComplete set, exercising the "Inactive" status filter.
            userId: "jamal-rivera-mock",
            avatar: "",
            href: "",
            name: "Jamal Rivera",
            email: "jamal.rivera@localcivics.io",
            reflection: "I liked working with my group on this one.",
            rating: 5,
            answers: []
        }
    ],
    questions: [
        {
            question: "An example question",
            answers: [["An example response"], ["Another example response"]]
        },
        {
            question: "Another example question",
            answers: []
        },
        {
            question: "A chart example question",
            chart: true,
            choices: ["A. An example response", "B. Another example response", "C. Three", "D. Four", "E. Five"],
            answers: [["A. An example response"], ["B. Another example response"], ["B. Another example response"]]
        },
    ]
};
