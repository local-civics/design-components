import { Story } from "@storybook/react";
import { BadgeItem, BadgeItemProps } from "./BadgeItem";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/BadgeItem",
  component: BadgeItem,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeItemProps> = (args) => (
  <BadgeItem headline="Onboarding Badge" imageURL="https://cdn.localcivics.io/badges/onboarding.png" {...args} />
);

/**
 * Component view
 */
export const Component: Story<BadgeItemProps> = Template.bind({});
Component.args = {};
