import React from "react";
import { TaskPreview } from "../TaskPreview/TaskPreview";
import { OpenBadge, OpenBadgeProps } from "./OpenBadge";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/OpenBadge",
  component: OpenBadge,
};

/**
 * Component storybook template
 */
const Template: Story<OpenBadgeProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <OpenBadge
      imageURL="https://cdn.localcivics.io/badges/participation.png"
      headline="Onboarding Badge"
      summary="A sample summary"
      {...args}
    >
      <TaskPreview status="done" headline="TaskPreview #1" />
      <TaskPreview headline="TaskPreview #2" />
      <TaskPreview headline="TaskPreview #3" />
    </OpenBadge>
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<OpenBadgeProps> = Template.bind({});
Component.args = {};
