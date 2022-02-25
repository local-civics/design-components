import { Story } from "@storybook/react";
import React from "react";
import { Pathway, PathwayProps } from "./Pathway";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Explore/Pathway",
  component: Pathway,
};

/**
 * Existing.
 */
export const Component: Story<PathwayProps> = (props) => <Pathway name="policy & government" {...props} />;
