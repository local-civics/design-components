import React from "react";
import { InMemoryApp } from "../../App";
import { Reflection } from "./Reflection";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Reflection",
  component: Reflection,
};

/**
 * Reflection
 */
export const Page = () => (
  <InMemoryApp accessToken="andre.carter" location="/residents/andre.carter/reflections/experience" />
);
