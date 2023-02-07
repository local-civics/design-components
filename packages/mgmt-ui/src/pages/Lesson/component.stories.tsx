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
                reflections={args.reflections || []}
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
    reflections: [
        {
            studentName: "Jane Doe",
            reflection: "An example reflection",
            rating: 2,
        }
    ],
    students: [
        {
            userId: "",
            avatar: "",
            href: "",
            name: "Jane Doe",
            email: "jane.doe@localcivics.io",
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
