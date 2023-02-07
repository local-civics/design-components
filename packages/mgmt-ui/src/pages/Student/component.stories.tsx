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
            badges={args.badges || []}
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
        lessons: [],
    },{
        badgeId: "",
        badgeName: "Unit 2 Badge",
        isComplete: false,
        lessons: [],
    }],
    answers: [
        {
            lessonId: "",
            lessonName: "An example lesson",
            questionName: "An example question",
            answer: ["My example answer"],
            href: "",
        }
    ],
    reflections: [
        {
            lessonId: "",
            lessonName: "An example lesson",
            reflection: "An example reflection",
            rating: 2,
            href: "",
        }
    ]
};
