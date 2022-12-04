import * as React                                         from "react";
import { SwitchAccount, SwitchAccountProps } from "./SwitchAccount";
import { Story }                                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Shells/App/SwitchAccount",
  component: SwitchAccount,
};

/**
 * Component storybook template
 */
const Template: Story<SwitchAccountProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <SwitchAccount{...args} opened/>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<SwitchAccountProps> = Template.bind({});
Component.args = {};
