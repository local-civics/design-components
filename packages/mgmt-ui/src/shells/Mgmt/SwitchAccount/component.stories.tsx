import * as React                                         from "react";
import {MgmtProvider}                                     from "../../../providers/MgmtProvider/MgmtProvider";
import { SwitchAccount, SwitchAccountProps, AccountData } from "./SwitchAccount";
import { Story }                                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Shells/Mgmt/SwitchAccount",
  component: SwitchAccount,
};

const mockdata: AccountData = {
        active: "1",
        accounts: [{
            key: "1",
            name: "Account #1"
        },{
            key: "2",
            name: "Account #2"
        },{
            key: "3",
            name: "Account #3"
        }],
    }

/**
 * Component storybook template
 */
const Template: Story<SwitchAccountProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <SwitchAccount
            {...args}
            opened
            data={args.data || mockdata}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<SwitchAccountProps> = Template.bind({});
Component.args = {};
