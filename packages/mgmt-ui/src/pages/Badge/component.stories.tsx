import * as React                        from "react";
import {Badge, BadgeProps} from "./Badge";
import { Story }                        from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Badges/Badge",
  component: Badge,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Badge {...args}/>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeProps> = Template.bind({});
Component.args = {};
