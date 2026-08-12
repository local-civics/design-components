import * as React              from "react";
import {MemoryRouter}          from "react-router-dom";
import {Student, StudentProps} from "./Student";
import { Story }               from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Student",
  component: Student,
};

/**
 * Component storybook template
 */
const Template: Story<StudentProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <MemoryRouter>
        <Student
            {...args}
            name={args.name || "Jane McDowell"}
            impactStatement={args.impactStatement || "I want to equip my students with transformational leadership skills so they could make impact in their communities!"}
            numberOfProblemsSolved={args.numberOfProblemsSolved || 17}
            percentageOfLessonsCompleted={args.percentageOfLessonsCompleted || 0}
            numberOfLessonsCompleted={args.numberOfLessonsCompleted || 0}
            badges={args.badges || []}
            lessons={args.lessons || []}
            answers={args.answers || []}
            reflections={args.reflections || []}
        />
      </MemoryRouter>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<StudentProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<StudentProps> = Template.bind({});
Mock.args = {
    badges: [{
        badgeId: "",
        badgeName: "Unit 1 Badge",
        isComplete: true,
    },{
        badgeId: "",
        badgeName: "Unit 2 Badge",
        isComplete: false,
    }],
    answers: [
        {
            lessonId: "lesson-1",
            lessonName: "An example lesson",
            badgeName: "Unit 1 Badge",
            questionName: "An example question",
            answer: ["My example answer"],
            href: "",
        },
        {
            lessonId: "lesson-1",
            lessonName: "An example lesson",
            badgeName: "Unit 1 Badge",
            questionName: "A second question in the same lesson",
            answer: ["Another example answer"],
            href: "",
        }
    ],
    reflections: [
        {
            lessonId: "lesson-1",
            lessonName: "An example lesson",
            badgeName: "Unit 1 Badge",
            reflection: "An example reflection",
            rating: 2,
            href: "",
        }
    ]
};
