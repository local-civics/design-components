import React from "react";
import { TitleSequence, TitleSequenceProps } from "./TitleSequence";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/LearningForm/TitleSequence",
  component: TitleSequence,
};

/**
 * Component storybook template
 */
const Template: Story<TitleSequenceProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <TitleSequence
      headline="Watch Obi's Career Journey and answer the questions below as you watch/listen:"
      imageURL="https://cdn.localcivics.io/hub/landing.jpg"
      pathway="policy & government"
      xp={300}
      {...args}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<TitleSequenceProps> = Template.bind({});
Component.args = {};
