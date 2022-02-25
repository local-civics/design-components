import { Story } from "@storybook/react";
import { SearchResult, SearchResultProps } from "./SearchResult";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Search/SearchResult",
  component: SearchResult,
};

/**
 * Component storybook template
 */
const Template: Story<SearchResultProps> = (args) => <SearchResult title="Result #1" icon="apple" {...args} />;

/**
 * Component stories
 */
export const Component: Story<SearchResultProps> = Template.bind({});
Component.args = {};
