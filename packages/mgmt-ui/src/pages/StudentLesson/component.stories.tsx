import * as React                        from "react";
import {StudentLesson, StudentLessonProps} from "./StudentLesson";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/StudentLesson",
  component: StudentLesson,
};

/**
 * Component storybook template
 */
const Template: Story<StudentLessonProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <StudentLesson
            {...args}
            questions={args.questions||[]}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<StudentLessonProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<StudentLessonProps> = Template.bind({});
Mock.args = {
    studentName: "Jane Doe",
    lessonName: "",
    lessonDescription: "",
    questions: [
        {
            question: "An example question",
            answers: ["An example response"]
        },
        {
            question: "Another example question",
            answers: []
        },
        {
            question: "A chart example question",
            answers: ["A. An example response"],
        },
    ]
};
