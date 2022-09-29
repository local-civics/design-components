import React                                                           from "react";
import {AdminLayout, AdminLayoutProps } from "./AdminLayout";
import { Story }                                                       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Library/AdminLayout",
  component: AdminLayout,
};

/**
 * Component storybook template
 */
const Template: Story<AdminLayoutProps> = (args) => {
    return <AdminLayout {...adminContext} {...args} />
};

/**
 * Component stories
 */
export const Component: Story<AdminLayoutProps> = Template.bind({});
Component.args = {};

/**
 * Testdata
 */
const adminContext = {
    givenName: "Jane",
    familyName: "Doe",
    avatarURL: "https://lh3.googleusercontent.com/a/AATXAJxa0wMhHpAMrAYKsXkB5Dr8ydbIB4oSYWINowvc=s96-c",
    canCreateOrganization: true,
    workspaces: [{
        workspaceId: "f1234abc",
        displayName: "Engineering",
        role: "Administrator",
        active: true,
    }, {
        workspaceId: "f1234abd",
        displayName: "Sales",
        role: "Coworker",
    }, {
        workspaceId: "f1234abe",
        displayName: "Product",
        role: "Mate",
    }],
}