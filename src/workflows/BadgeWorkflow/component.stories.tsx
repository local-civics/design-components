import React from "react";
import { TaskPreview } from "../../components/Task/TaskPreview/TaskPreview";
import { BadgeWorkflow, BadgeWorkflowProps } from "./BadgeWorkflow";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Workflow/BadgeWorkflow",
  component: BadgeWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeWorkflowProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <BadgeWorkflow
      imageURL="https://cdn.localcivics.io/badges/participation.png"
      headline="OnboardingWorkflow Badge"
      summary="A sample summary"
      {...args}
    >
      <TaskPreview status="done" headline="TaskPreview #1" />
      <TaskPreview headline="TaskPreview #2" />
      <TaskPreview headline="TaskPreview #3" />
    </BadgeWorkflow>
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeWorkflowProps> = Template.bind({});
Component.args = {};
