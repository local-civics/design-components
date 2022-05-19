import React from "react";
import { ReflectionWorkflow, ReflectionWorkflowProps } from "./ReflectionWorkflow";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Workflow/ReflectionWorkflow",
  component: ReflectionWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<ReflectionWorkflowProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <ReflectionWorkflow
      xp={250}
      pathway="arts & culture"
      imageURL="https://s.yimg.com/os/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae"
      headline="A learning experience"
      startTime={new Date().toString()}
      {...args}
    />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ReflectionWorkflowProps> = Template.bind({});
Component.args = {};
