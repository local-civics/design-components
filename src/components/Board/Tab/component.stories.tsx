import { Story } from "@storybook/react";
import React from "react";
import { Tab, TabProps } from "./Tab";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Board/Tab",
  component: Tab,
};

/**
 * Component storybook template
 */
const Template: Story<TabProps> = (args) => <Tab icon="milestones" title="milestones" {...args} />;

/**
 * Component view
 */
export const Component: Story<TabProps> = Template.bind({});
Component.args = {};
