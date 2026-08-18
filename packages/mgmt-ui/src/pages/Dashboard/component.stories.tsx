import * as React                  from "react";
import {MemoryRouter}              from "react-router-dom";
import {Dashboard, DashboardProps} from "./Dashboard";
import { Story }                   from "@storybook/react";

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
      <MemoryRouter>
          <Dashboard
                {...args}
                students={args.students || []}
                impacts={args.impacts || []}
                reflections={args.reflections || []}
                classes={args.classes || []}
                badges={args.badges || []}
                lessons={args.lessons || []}
                numberOfLessonsCompleted={args.numberOfLessonsCompleted || 0}
                numberOfBadgesEarned={args.numberOfBadgesEarned || 0}
                percentageOfAccountsCreated={args.percentageOfAccountsCreated || 0}
            />
      </MemoryRouter>
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
        studentId: "1",
        className: "AP History",
        studentName: "Jane Doe",
    },{
        studentId: "2",
        className: "Biology",
        studentName: "Aaron Smith",
    }],
    impacts: [{
        studentName: "Jane Doe",
        impactStatement: "An example impact statement",
    },{
        studentName: "Aaron Smith",
        impactStatement: "Another example impact statement",
    }],
    classes: [{
        classId: "1",
        name: "AP History",
    },{
        classId: "2",
        name: "Biology",
    }],
    reflections: [{
        lessonName: "Example lesson",
        updatedAt: new Date().toISOString(),
        studentName: "Jane Doe",
        reflection: "An example reflection",
    },{
        lessonName: "Another example lesson",
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        studentName: "Aaron Smith",
        reflection: "Another example reflection, from a few days earlier",
    }],
    badges: [{
        badgeId: "1",
        name: "Example badge #1",
        description: "An example badge",
        percentageCompletion: 0.4,
    },{
        badgeId: "2",
        name: "Example badge #2",
        description: "Another example badge",
        percentageCompletion: 0.85,
    }],
    lessons: [{
        lessonId: "1",
        name: "Example lesson #1",
        description: "An example lesson",
        percentageCompletion: 0.4,
    },{
        lessonId: "2",
        name: "Example lesson #2",
        description: "Another example lesson",
        percentageCompletion: 0.85,
    }]
};
