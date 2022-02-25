import React from "react";
import { Task } from "../Task/Task";
import { BadgeModal, BadgeModalProps } from "./BadgeModal";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/BadgeModal",
  component: BadgeModal,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeModalProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <BadgeModal
      status="done"
      imageURL="https://cdn.localcivics.io/badges/participation.png"
      visible
      displayName="Onboarding Badge"
      summary="A sample summary"
      {...args}
    >
      <Task status="done" displayName="Task #1" />
      <Task action displayName="Task #2" />
      <Task action displayName="Task #3" />
    </BadgeModal>
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeModalProps> = Template.bind({});
Component.args = {};
