import * as React                          from "react";
import { AdminContext, AdminContextProps } from "./AdminContext";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/AdminLayout/AdminContext",
  component: AdminContext,
};

/**
 * Component storybook template
 */
const Template: Story<AdminContextProps> = (args) => {
    return <div className="h-full w-full overscroll-none font-proxima">
        <div className="float-right">
            <AdminContext
                givenName="Jane"
                familyName="Doe"
                avatarURL="https://lh3.googleusercontent.com/a/AATXAJxa0wMhHpAMrAYKsXkB5Dr8ydbIB4oSYWINowvc=s96-c"
                workspaces={[{
                    workspaceId: "f1234abc",
                    displayName: "Google",
                    active: true,
                }, {
                    workspaceId: "f1234abd",
                    displayName: "Coworkers",
                }, {
                    workspaceId: "f1234abe",
                    displayName: "Mates",
                }]}
                {...args}
            />
        </div>
    </div>
};

/**
 * Component stories
 */
export const Component: Story<AdminContextProps> = Template.bind({});
Component.args = {};
