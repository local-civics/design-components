import { Story } from "@storybook/react";
import { BadgeItem } from "../BadgeItem/BadgeItem";
import { BadgeList, BadgeListProps } from "./BadgeList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/BadgeList",
  component: BadgeList,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeListProps> = (args) => (
  <BadgeList {...args}>
    <BadgeItem headline="Onboarding Badge" imageURL="https://cdn.localcivics.io/badges/onboarding.png" />
    <BadgeItem headline="Item #2 Badge" />
    <BadgeItem headline="Item #3 Badge" />
  </BadgeList>
);

/**
 * Component view
 */
export const Component: Story<BadgeListProps> = Template.bind({});
Component.args = {};
