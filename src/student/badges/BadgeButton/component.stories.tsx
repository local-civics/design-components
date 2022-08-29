import * as React from "react";
import { Story } from "@storybook/react";

import { BadgeButton, BadgeButtonProps } from "./BadgeButton";

/**
 * Storybook component configuration
 */
export default {
  title: "Student/Badges/BadgeButton",
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
