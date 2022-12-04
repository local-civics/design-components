import * as React                        from "react";
import {Groups, GroupsProps} from "./Groups";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Groups",
  component: Groups,
};

/**
 * Component storybook template
 */
const Template: Story<GroupsProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Groups {...args}/>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<GroupsProps> = Template.bind({});
Component.args = {};
