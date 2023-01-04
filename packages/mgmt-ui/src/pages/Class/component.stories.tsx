import * as React                        from "react";
import {Class, ClassProps} from "./Class";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Class",
  component: Class,
};

/**
 * Component storybook template
 */
const Template: Story<ClassProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Class
            {...args}
            percentageOfAccountsCreated={args.percentageOfAccountsCreated||0}
            numberOfBadgesEarned={args.numberOfBadgesEarned||0}
            numberOfLessonsCompleted={args.numberOfLessonsCompleted||0}
            students={args.students || []}
            displayName={args.displayName || "AP History"}
            description={args.description || "Class focused on the history of the United States"}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<ClassProps> = Template.bind({});
Component.args = {};

/**
 * Mock stories
 */
export const Mock: Story<ClassProps> = Template.bind({});
Mock.args = {
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
