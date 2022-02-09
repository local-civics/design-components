import { Search, SearchProps } from "./Search";
import { Story } from "@storybook/react";
import { SearchResult } from "./SearchResult/SearchResult";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Search",
  component: Search,
};

/**
 * Component storybook template
 */
const Template: Story<SearchProps> = (args) => (
  <Search {...args}>
    <SearchResult title="Result #1" icon="explore" />
    <SearchResult title="Result #2" icon="cohort" />
    <SearchResult title="Result #3" icon="clock" />
    <SearchResult title="Result #5" icon="college & career" />
    <SearchResult title="Result #6" icon="activity" />
    <SearchResult title="Result #7" icon="advocate" />
    <SearchResult title="Result #8" icon="milestone" />
    <SearchResult title="Result #9" icon="apple" />
    <SearchResult title="Result #10" icon="sponsored" />
  </Search>
);

/**
 * Component stories
 */
export const Component: Story<SearchProps> = Template.bind({});
Component.args = {};
