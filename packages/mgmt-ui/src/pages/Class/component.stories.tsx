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

// example student: {givenName: "Jane", familyName: "Doe", hasAccount: true, badgesEarned: 5, lessonsCompleted: 5}

/**
 * Component storybook template
 */
const Template: Story<ClassProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Class
            {...args}
            students={args.students || []}
            percentageOfAccountsCreated={args.percentageOfAccountsCreated || 0}
            percentageOfBadgesEarned={args.percentageOfBadgesEarned || 0}
            percentageOfLessonsCompleted={args.percentageOfLessonsCompleted || 0}
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
