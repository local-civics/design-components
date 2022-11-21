import React from "react";
import { SearchResult } from "../../Search";
import { CommunitySearch, CommunitySearchProps } from "./CommunitySearch";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Onboarding/CommunitySearch",
  component: CommunitySearch,
};

/**
 * Component storybook template
 */
const Template: Story<CommunitySearchProps> = (args) => {
  const results = (
    <>
      <SearchResult title="Result #1" icon="explore" />
      <SearchResult title="Result #2" icon="cohort" />
      <SearchResult title="Result #3" icon="clock" />
      <SearchResult title="Result #5" icon="college & career" />
      <SearchResult title="Result #6" icon="activity" />
      <SearchResult title="Result #7" icon="advocate" />
      <SearchResult title="Result #8" icon="milestone" />
      <SearchResult title="Result #9" icon="apple" />
      <SearchResult title="Result #10" icon="sponsored" />
    </>
  );

  return (
    <div className="w-max font-proxima m-auto">
      <CommunitySearch results={results} name="New Community" {...args} />
    </div>
  );
};

/**
 * Component stories
 */
export const Component: Story<CommunitySearchProps> = Template.bind({});
Component.args = {};
