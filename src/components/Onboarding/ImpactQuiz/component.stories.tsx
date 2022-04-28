import React from "react";
import { ImpactQuiz, ImpactQuizProps } from "./ImpactQuiz";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Onboarding/ImpactQuiz",
  component: ImpactQuiz,
};

/**
 * Component storybook template
 */
const Template: Story<ImpactQuizProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <ImpactQuiz {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ImpactQuizProps> = Template.bind({});
Component.args = {};
