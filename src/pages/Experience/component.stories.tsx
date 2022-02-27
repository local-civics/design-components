import React from "react";
import { InMemoryApp } from "../../App";
import { Experience } from "./Experience";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Experience",
  component: Experience,
};

/**
 * Experience
 */
export const Page = () => <InMemoryApp accessToken="andre.carter" location="/communities/hcz/explore/experience" />;
