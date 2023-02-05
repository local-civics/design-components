import * as React                                         from "react";
import { SwitchAccount, SwitchAccountProps } from "./SwitchAccount";
import { Story }                                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Components/SwitchAccount",
  component: SwitchAccount,
};

/**
 * Component storybook template
 */
const Template: Story<SwitchAccountProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <SwitchAccount {...args} opened accounts={[
            {accountId: "1", name: "Account #1", isAdmin: true},
            {accountId: "2", name: "Account #2", isGroupAdmin: true},
            {accountId: "3", name: "Account #3"},
            {accountId: "4", name: "Account #4"},
        ]}/>
        <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<SwitchAccountProps> = Template.bind({});
Component.args = {};
