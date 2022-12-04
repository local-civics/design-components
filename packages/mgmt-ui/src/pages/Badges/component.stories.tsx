import * as React                from "react";
import {Badges, BadgesProps} from "./Badges";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Badges",
  component: Badges,
};

/**
 * Component storybook template
 */
const Template: Story<BadgesProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Badges {...args}/>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgesProps> = Template.bind({});
Component.args = {};
