import React from "react";
import { Story } from "@storybook/react";
import { PathwaysList, PathwaysListProps } from "./PathwaysList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/PathwaysList",
  component: PathwaysList,
};

/**
 * Component storybook template
 */
const Template: Story<PathwaysListProps> = (args) => (
  <div style={{ width: 900 }}>
    <PathwaysList {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<PathwaysListProps> = Template.bind({});
Component.args = {
  pathways: [
    {
      pathwayId: "1",
      title: "NYS Seal of Civic Readiness",
      description:
        "A pathway designed to account for student civic knowledge and civic experiences throughout middle and high school.",
      badges: new Array(16).fill({}),
      progress: 1,
      target: 16,
      onClick: () => console.log("navigate to /pathways/1"),
    },
    {
      pathwayId: "2",
      title: "NYS Seal of Biliteracy",
      description: "Demonstrates proficiency in two or more languages by high school graduation.",
      badges: new Array(10).fill({}),
      progress: 3,
      target: 10,
      onClick: () => console.log("navigate to /pathways/2"),
    },
    {
      pathwayId: "3",
      title: "Cybersecurity CTE Pathway",
      description: "Career and technical education pathway covering foundational cybersecurity skills.",
      badges: new Array(10).fill({}),
      progress: 5,
      target: 10,
      onClick: () => console.log("navigate to /pathways/3"),
    },
    {
      pathwayId: "4",
      title: "SUNY Early College Program",
      description: "Earn transferable college credit through SUNY-affiliated coursework.",
      badges: new Array(20).fill({}),
      progress: 0,
      target: 20,
      onClick: () => console.log("navigate to /pathways/4"),
    },
    {
      pathwayId: "5",
      title: "Community Leadership Pathway",
      description: "Build leadership skills through service projects and mentorship.",
      badges: new Array(12).fill({}),
      progress: 12,
      target: 12,
      onClick: () => console.log("navigate to /pathways/5"),
    },
  ],
};

/**
 * Empty state
 */
export const Empty: Story<PathwaysListProps> = Template.bind({});
Empty.args = {
  pathways: [],
};
