import { Story } from "@storybook/react";
import React from "react";
import { FilterList, FilterListProps } from "./FilterList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Explore/FilterList",
  component: FilterList,
};

/**
 * Existing.
 */
export const Component: Story<FilterListProps> = (props) => <FilterList {...props} />;
