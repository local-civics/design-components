import * as React                      from "react";
import {Dashboard, DashboardProps} from "./Dashboard";
import { Story }                       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Dashboard",
  component: Dashboard,
};

/**
 * Component storybook template
 */
const Template: Story<DashboardProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <Dashboard
        {...args}
        students={args.students || []}
        impacts={args.impacts || []}
        reflections={args.reflections || []}
        classes={args.classes || []}
        badges={args.badges || []}
        lessons={args.lessons || []}
        percentageOfLessonsCompleted={args.percentageOfLessonsCompleted || 0}
        percentageOfBadgesEarned={args.percentageOfBadgesEarned || 0}
        percentageOfAccountsCreated={args.percentageOfAccountsCreated || 0}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<DashboardProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<DashboardProps> = Template.bind({});
Mock.args = {
    students: [{
        studentId: "",
        className: "AP History",
        studentName: "Jane Doe",
    }],
    impacts: [{
        studentName: "Jane Doe",
        impactStatement: "An example impact statement",
    }],
    classes: [{
        classId: "",
        name: "AP History",
    }],
    reflections: [{
        studentName: "Jane Doe",
        reflection: "An example reflection",
        rating: 4,
    }],
    badges: [{
        badgeId: "",
        name: "Example badge #1",
        description: "An example badge",
        percentageCompletion: 0.4,
    }],
    lessons: [{
        lessonId: "",
        name: "Example lesson #1",
        description: "An example lesson",
        percentageCompletion: 0.4,
    }]
};
