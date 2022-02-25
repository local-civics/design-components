import { Story } from "@storybook/react";
import React from "react";
import { Pathway } from "../Pathway/Pathway";
import { PathwayList, PathwayListProps } from "./PathwayList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Explore/PathwayList",
  component: PathwayList,
};

/**
 * Existing.
 */
export const Component: Story<PathwayListProps> = (props) => (
  <PathwayList {...props}>
    <Pathway name="policy & government" />
    <Pathway name="arts & culture" />
    <Pathway name="recreation" />
    <Pathway name="volunteer" />
    <Pathway name="college & career" />
  </PathwayList>
);
