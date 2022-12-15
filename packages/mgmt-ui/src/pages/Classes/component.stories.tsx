import * as React                        from "react";
import {Classes, ClassesProps} from "./Classes";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Classes",
  component: Classes,
};

/**
 * Component storybook template
 */
const Template: Story<ClassesProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Classes
            {...args}
            classes={args.classes || []}
            students={args.students || []}
            numberOfStudents={args.numberOfStudents || 147}
            percentageOfAccountsCreated={args.percentageOfAccountsCreated || 0}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<ClassesProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<ClassesProps> = Template.bind({});
Mock.args = {
    classes: [{
        classId: "",
        name: "AP History",
        description: "Class for my first period API history subject",
    }],
    students: [{
        classId: "",
        studentId: "",
        avatar: "",
        readonly: false,
        lastActivity: null,
        email: "jane.doe@localcivics.io",
        givenName: "Jane",
        familyName: "Doe",
        hasAccount: true,
        badgesEarned: 5,
        lessonsCompleted: 5,
    }]
};