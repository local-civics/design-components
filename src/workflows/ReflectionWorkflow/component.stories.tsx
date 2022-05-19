import React from "react";
import { OpenReflection, OpenReflectionProps } from "./OpenReflection";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Workflow/ReflectionWorkflow",
  component: OpenReflection,
};

/**
 * Component storybook template
 */
const Template: Story<OpenReflectionProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <OpenReflection
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
export const Component: Story<OpenReflectionProps> = Template.bind({});
Component.args = {};
