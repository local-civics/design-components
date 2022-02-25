import { Story } from "@storybook/react";
import { BadgeComponent as Badge } from "../Badge/Badge";
import { BadgeWorkflow, BadgeWorkflowProps } from "./BadgeWorkflow";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/BadgeWorkflow",
  component: BadgeWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeWorkflowProps> = (args) => (
  <BadgeWorkflow {...args}>
    <Badge displayName="onboarding badge" imageURL="https://cdn.localcivics.io/badges/onboarding.png" status="done" />
    <Badge displayName="badge #2" status="todo" />
    <Badge displayName="badge #3" />
  </BadgeWorkflow>
);

/**
 * Component view
 */
export const Component: Story<BadgeWorkflowProps> = Template.bind({});
Component.args = {};
