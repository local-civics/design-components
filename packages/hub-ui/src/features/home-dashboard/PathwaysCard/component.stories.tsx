import React from "react";
import { Story } from "@storybook/react";
import { PathwaysCard, PathwaysCardProps } from "./PathwaysCard";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/PathwaysCard",
  component: PathwaysCard,
};

/**
 * Component storybook template
 */
const Template: Story<PathwaysCardProps> = (args) => (
  <div style={{ width: 520 }}>
    <PathwaysCard {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<PathwaysCardProps> = Template.bind({});
Component.args = {
  pathways: [
    { pathwayId: "1", title: "NYS Seal of Biliteracy", badges: new Array(10).fill({}), progress: 3, target: 10 },
    { pathwayId: "2", title: "NYS Seal of Civic Readiness", badges: new Array(20).fill({}), progress: 3, target: 20 },
    { pathwayId: "3", title: "Cybersecurity CTE", badges: new Array(10).fill({}), progress: 5, target: 10 },
    { pathwayId: "4", title: "SUNY Early College Program", badges: new Array(20).fill({}), progress: 0, target: 20 },
  ],
};
