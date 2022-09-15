import { Story } from "@storybook/react";
import React                         from "react";
import { TagFilter, TagFilterProps } from "./TagFilter";

/**
 * Storybook component configuration
 */
export default {
  title: "Student/Activities/TagFilter",
  component: TagFilter,
};

/**
 * Existing.
 */
export const Component: Story<TagFilterProps> = (props) => <TagFilter {...props} />;
