import { Story } from "@storybook/react";
import React from "react";
import { PathwayButton, PathwayButtonProps } from "./PathwayButton";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Explore/PathwayButton",
  component: PathwayButton,
};

/**
 * Existing.
 */
export const Component: Story<PathwayButtonProps> = (props) => <PathwayButton name="policy & government" {...props} />;
