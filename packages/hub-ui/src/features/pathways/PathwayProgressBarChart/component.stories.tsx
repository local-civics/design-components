import React from "react";
import { Story } from "@storybook/react";
import { PathwayProgressBarChart, PathwayProgressBarChartProps } from "./PathwayProgressBarChart";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/PathwayProgressBarChart",
  component: PathwayProgressBarChart,
};

/**
 * Component storybook template
 */
const Template: Story<PathwayProgressBarChartProps> = (args) => (
  <div style={{ width: 500 }}>
    <PathwayProgressBarChart {...args} />
  </div>
);

/**
 * Three categories at various stages, accent cycling cyan/mint/gold
 */
export const Component: Story<PathwayProgressBarChartProps> = Template.bind({});
Component.args = {
  height: "md",
  targets: {
    "Civic Knowledge": 2,
    "Civic Participation": 2,
    "Seal Of Civic Readiness": 6,
  },
  points: {
    "Civic Knowledge": 0,
    "Civic Participation": 1,
    "Seal Of Civic Readiness": 6,
  },
};
