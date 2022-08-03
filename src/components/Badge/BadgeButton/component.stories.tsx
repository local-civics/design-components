import * as React from "react";
import { BadgeButton, BadgeButtonProps } from "./BadgeButton";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/BadgeButton",
  component: BadgeButton,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeButtonProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <BadgeButton displayName="College Explorer" startedAt="2020-12-22T02:53:05.929149Z" icon="award ribbon" {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeButtonProps> = Template.bind({});
Component.args = {};
