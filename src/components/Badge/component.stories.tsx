import * as React from "react";
import { Badge, BadgeProps } from "./Badge";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge",
  component: Badge,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <Badge startedAt="2020-12-22T02:53:05.929149Z" icon="award ribbon" {...args}/>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeProps> = Template.bind({});
Component.args = {};
