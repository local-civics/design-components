import React                                           from "react";
import { ActivityReflection, ActivityReflectionProps } from "./ActivityReflection";
import { Story }                                       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Student/Activities/ActivityReflection",
  component: ActivityReflection,
};

/**
 * Component storybook template
 */
const Template: Story<ActivityReflectionProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <ActivityReflection
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
export const Component: Story<ActivityReflectionProps> = Template.bind({});
Component.args = {};
