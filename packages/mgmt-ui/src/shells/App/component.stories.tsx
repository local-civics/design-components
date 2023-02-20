import * as React      from "react";
import {MemoryRouter}  from "react-router-dom";
import {Navbar}  from "../../components/navigation/Navbar/Navbar";
import {AdminProvider} from "../../providers/AdminProvider/AdminProvider";
import {App, AppProps} from "./App";
import { Story }       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Shells/App",
  component: App,
};

/**
 * Component storybook template
 */
const Template: Story<AppProps> = (args) => (
    <AdminProvider>
        <MemoryRouter>
          <div className="h-full w-full overscroll-none font-proxima">
            <App {...args}
                accounts={[
                    {accountId: "1", name: "Account #1", isAdmin: true},
                    {accountId: "2", name: "Account #2", isGroupAdmin: true},
                    {accountId: "3", name: "Account #3"},
                    {accountId: "4", name: "Account #4"},
                ]}
                 navbar={<Navbar
                     image={"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"}
                     name={"Ann Nullpointer"}
                     email={"anullpointer@yahoo.com"}
                     version={"v3.1.2"}
                     active={"Organization/People"}
                     onLogout={() => {}}
                     links={{
                         "Classes": {notifications: 3, href: ""},
                         "Badges": {notifications: 12, href: ""},
                         "Lessons": {notifications: 57, href: ""},
                         "Organization/People": {notifications: 123, href: ""},
                     }}
                 />}
            />
          </div>
        </MemoryRouter>
    </AdminProvider>
);

/**
 * Component stories
 */
export const Component: Story<AppProps> = Template.bind({});
Component.args = {};
