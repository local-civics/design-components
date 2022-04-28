import { Story } from "@storybook/react";
import React from "react";
import { Pathway } from "../Pathway/Pathway";
import { PathwayFilter, PathwayFilterProps } from "./PathwayFilter";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Explore/PathwayFilter",
  component: PathwayFilter,
};

/**
 * Existing.
 */
export const Component: Story<PathwayFilterProps> = (props) => (
  <PathwayFilter {...props}>
    <Pathway name="policy & government" />
    <Pathway name="arts & culture" />
    <Pathway name="recreation" />
    <Pathway name="volunteer" />
    <Pathway name="college & career" />
  </PathwayFilter>
);
