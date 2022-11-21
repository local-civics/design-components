import { Story } from "@storybook/react";
import React from "react";
import { PathwayButton } from "../PathwayButton/PathwayButton";
import { PathwayFilter, PathwayFilterProps } from "./PathwayFilter";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Pathway/PathwayFilter",
  component: PathwayFilter,
};

/**
 * Existing.
 */
export const Component: Story<PathwayFilterProps> = (props) => (
  <PathwayFilter {...props}>
    <PathwayButton name="policy & government" />
    <PathwayButton name="arts & culture" />
    <PathwayButton name="recreation" />
    <PathwayButton name="volunteer" />
    <PathwayButton name="college & career" />
  </PathwayFilter>
);
