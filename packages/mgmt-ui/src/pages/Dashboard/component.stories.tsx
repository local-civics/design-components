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
        lessonName: "Example lesson",
        updatedAt: new Date().toISOString(),
        studentName: "Jane Doe",
        reflection: "An example reflection",
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
