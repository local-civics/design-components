import { Story } from "@storybook/react";
import { SearchButton, SearchButtonProps } from "./SearchButton";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/SearchButton",
  component: SearchButton,
};

/**
 * Component storybook template
 */
const Template: Story<SearchButtonProps> = (args) => <SearchButton placeholder="Quick search..." {...args} />;

/**
 * Component stories
 */
export const Component: Story<SearchButtonProps> = Template.bind({});
Component.args = {};
