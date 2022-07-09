import React from "react";
import { TaskItem } from "../../Task";
import { BadgeCard, BadgeCardProps } from "./BadgeCard";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/BadgeCard",
  component: BadgeCard,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeCardProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <BadgeCard
      imageURL="https://cdn.localcivics.io/badges/participation.png"
      headline="Onboarding Badge"
      summary="A sample summary"
      {...args}
    >
      <TaskItem status="done" headline="Item #1" />
      <TaskItem headline="Item #2" />
      <TaskItem headline="Item #3" />
    </BadgeCard>
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeCardProps> = Template.bind({});
Component.args = {};
