import * as React           from "react";
import {People, PeopleProps} from "./People";
import { Story }            from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/People",
  component: People,
};

/**
 * Component storybook template
 */
const Template: Story<PeopleProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <People
            {...args}
            percentageOfAccountsCreated={args.percentageOfAccountsCreated||0}
            percentageRostered={args.percentageRostered||0}
            users={args.users || []}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<PeopleProps> = Template.bind({});
Component.args = {};

/**
 * Mock stories
 */
export const Mock: Story<PeopleProps> = Template.bind({});
Mock.args = {
    users: [{
        userId: "1",
        avatar: "",
        href: "",
        readonly: false,
        lastActivity: null,
        email: "jane.doe@localcivics.io",
        givenName: "Jane",
        familyName: "Doe",
        hasAccount: true,
        numberOfClasses: 8,
        isAdmin: false,
        isGroupAdmin: false,
    },{
        userId: "2",
        avatar: "",
        href: "",
        readonly: false,
        lastActivity: null,
        email: "jenny.doe@localcivics.io",
        givenName: "Jenny",
        familyName: "Doe",
        hasAccount: true,
        numberOfClasses: 1,
        isAdmin: false,
        isGroupAdmin: true,
    },{
        userId: "3",
        avatar: "",
        href: "",
        readonly: false,
        lastActivity: null,
        email: "james.doe@localcivics.io",
        givenName: "James",
        familyName: "Doe",
        hasAccount: true,
        numberOfClasses: 5,
        isAdmin: true,
        isGroupAdmin: false,
    }]
};
