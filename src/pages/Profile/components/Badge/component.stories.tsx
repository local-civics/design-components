import { Story } from "@storybook/react";
import { Badge, BadgeProps } from "./Badge";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge",
  component: Badge,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeProps> = (args) => (
  <Badge
    title="Onboarding Badge"
    status="bearing"
    imageURL="https://cdn.localcivics.io/badges/onboarding.png"
    {...args}
  />
);

/**
 * Component view
 */
export const Component: Story<BadgeProps> = Template.bind({});
Component.args = {};
