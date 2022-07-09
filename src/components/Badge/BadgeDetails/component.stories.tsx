import React from "react";
import { TaskItem } from "../../Task";
import { BadgeDetails, BadgeDetailsProps } from "./BadgeDetails";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/BadgeDetails",
  component: BadgeDetails,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeDetailsProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <BadgeDetails
      imageURL="https://cdn.localcivics.io/badges/participation.png"
      headline="Onboarding Badge"
      summary="A sample summary"
      {...args}
    >
      <TaskItem status="done" headline="Item #1" />
      <TaskItem headline="Item #2" />
      <TaskItem headline="Item #3" />
    </BadgeDetails>
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeDetailsProps> = Template.bind({});
Component.args = {};
