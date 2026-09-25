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
        badgeId: "unit-1",
        badgeName: "Unit 1 Badge",
        isComplete: true,
        pathwayId: "civic-readiness",
        pathwayName: "Civic Readiness",
        href: "",
    },{
        badgeId: "digital-citizen",
        badgeName: "Digital Citizenship Badge",
        isComplete: true,
        pathwayId: "digital-citizenship",
        pathwayName: "Digital Citizenship",
        href: "",
    },{
        // Exercises the "Other" pill and the pathway-pill row's overall gate - a badge with no
        // matching pathway, alongside two that do.
        badgeId: "unit-2",
        badgeName: "Unit 2 Badge",
        isComplete: false,
        href: "",
    }],
    lessons: [
        {
            // Submitted, with both questions and a reflection - the fullest case.
            lessonId: "lesson-1",
            lessonName: "An example lesson",
            badgeName: "Unit 1 Badge",
            pathwayId: "civic-readiness",
            pathwayName: "Civic Readiness",
            href: "",
            isComplete: true,
            hasResponses: true,
            questions: [
                {questionName: "An example question", answer: ["My example answer"]},
                {questionName: "A second question in the same lesson", answer: ["Another example answer"]},
            ],
            reflection: "An example reflection",
            rating: 2,
        },
        {
            // In progress (not submitted), has responses, no reflection, no pathway match -
            // exercises "Other" and the "Has responses" filter without also being "Submitted".
            lessonId: "lesson-2",
            lessonName: "An unbadged lesson",
            href: "",
            isComplete: false,
            hasResponses: true,
            questions: [{questionName: "A standalone question", answer: ["A standalone answer"]}],
            reflection: "",
            rating: "",
        },
        {
            // Opened but nothing recorded yet - exercises the empty-state fallback and confirms
            // the "Has responses" filter correctly excludes it.
            lessonId: "lesson-3",
            lessonName: "A lesson with no responses yet",
            badgeName: "Digital Citizenship Badge",
            pathwayId: "digital-citizenship",
            pathwayName: "Digital Citizenship",
            href: "",
            isComplete: false,
            hasResponses: false,
            questions: [],
            reflection: "",
            rating: "",
        },
    ],
};
