import * as React          from "react";
import {MemoryRouter}      from "react-router-dom";
import {AdminProvider}     from "../../providers/AdminProvider/AdminProvider";
import {Class, ClassProps} from "./Class";
import { Story }           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Class",
  component: Class,
};

/**
 * Component storybook template. Wrapped in AdminProvider (Mantine's ModalsProvider lives there)
 * since the delete-confirmation dialog is a real openConfirmModal call, same as before this
 * round's restyle — without this wrapper the confirm modal has nowhere to portal into.
 */
const Template: Story<ClassProps> = (args) => (
    <AdminProvider><div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Class
                {...args}
                percentageOfAccountsCreated={args.percentageOfAccountsCreated||0}
                numberOfBadgesEarned={args.numberOfBadgesEarned||0}
                numberOfLessonsCompleted={args.numberOfLessonsCompleted||0}
                members={args.members || []}
                displayName={args.displayName || "AP History"}
                description={args.description || "Class focused on the history of the United States"}
                onCreateMembers={args.onCreateMembers || (() => {})}
                onDeleteMember={args.onDeleteMember || (() => {})}
                onChangeUserRole={args.onChangeUserRole || (() => {})}
                onCopyLinkClick={args.onCopyLinkClick || (() => {})}
                onExportDataClick={args.onExportDataClick || (() => {})}
                onBackClick={args.onBackClick || (() => {})}
            />
        </MemoryRouter>
    </div></AdminProvider>
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
    members: [{
        classId: "",
        userId: "",
        avatar: "",
        href: "",
        readonly: false,
        lastActivity: null,
        email: "jane.doe@localcivics.io",
        givenName: "Jane",
        familyName: "Doe",
        hasAccount: true,
        badgesEarned: 5,
        lessonsCompleted: 5,
        isAdmin: false,
    }]
};
