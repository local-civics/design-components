import { Story } from "@storybook/react";
import React from "react";
import { Experience, ExperienceProps } from "./Experience";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Explore/Experience",
  component: Experience,
};

/**
 * Existing.
 */
export const Component: Story<ExperienceProps> = (props) => (
  <Experience
    displayName="Event #1"
    pathway="policy & government"
    quality={250}
    imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
    {...props}
  />
);
