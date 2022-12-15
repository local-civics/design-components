import * as React                  from "react";
import {Student, StudentProps} from "./Student";
import { Story }                   from "@storybook/react";

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
    <Student
        {...args}
        name={args.name || "Jane McDowell"}
        impactStatement={args.impactStatement || "I want to equip my students with transformational leadership skills so they could make impact in their communities!"}
        organization={args.organization || {name: "Local Civics", description: "An example organization", website: "https://www.localcivics.io", image: "https://cdn.localcivics.io/hub/landing.jpg"}}
        numberOfProblemsSolved={args.numberOfProblemsSolved || 17}
        percentageOfLessonsCompleted={args.percentageOfLessonsCompleted || 0}
        badges={args.badges || []}
        answers={args.answers || []}
        reflections={args.reflections || []}
    />
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
        badgeName: "Unit 1 Badge",
        isComplete: true,
    },{
        badgeName: "Unit 2 Badge",
        isComplete: false,
    }],
    answers: [
        {
            lessonName: "An example lesson",
            questionName: "An example question",
            answer: ["My example answer"]
        }
    ],
    reflections: [
        {
            lessonName: "An example lesson",
            reflection: "An example reflection",
            rating: 2,
        }
    ]
};