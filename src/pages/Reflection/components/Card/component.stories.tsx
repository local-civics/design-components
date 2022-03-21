import React from "react";
import { Card, CardProps } from "./Card";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Reflection/Card",
  component: Card,
};

/**
 * Component storybook template
 */
const Template: Story<CardProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <Card
      xp={250}
      pathway="arts & culture"
      imageURL="https://s.yimg.com/os/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae"
      visible
      headline="A learning experience"
      summary="A sample summary"
      startTime={new Date().toString()}
      address="123 Civic Lane, Brooklyn, NY, 12345"
      link="https://www.localcivics.io"
      skills={["math", "public speaking", "engineering"]}
      {...args}
    />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CardProps> = Template.bind({});
Component.args = {};
