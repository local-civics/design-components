import { Story } from "@storybook/react";
import { BadgeComponent, BadgeProps } from "./Badge";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/Badge",
  component: BadgeComponent,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeProps&{status?: string}> = (args) => (
  <BadgeComponent
    headline="Onboarding Badge"
    status="done"
    imageURL="https://cdn.localcivics.io/badges/onboarding.png"
    {...args}
  />
);

/**
 * Component view
 */
export const Component: Story<BadgeProps> = Template.bind({});
Component.args = {};
