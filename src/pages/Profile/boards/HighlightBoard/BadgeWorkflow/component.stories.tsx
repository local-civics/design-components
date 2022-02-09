import { Story } from "@storybook/react";
import { Badge } from "../../../components/Badge/Badge";
import { BadgeWorkflow, BadgeWorkflowProps } from "./BadgeWorkflow";

/**
 * Storybook component configuration
 */
export default {
  title: "Profile/HighlightBoard/BadgeWorkflow",
  component: BadgeWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeWorkflowProps> = (args) => (
  <BadgeWorkflow {...args}>
    <Badge title="onboarding badge" imageURL="https://cdn.localcivics.io/badges/onboarding.png" status="bearing" />
    <Badge title="badge #2" status="contingent" statusIcon="unlock" />
    <Badge title="badge #3" status="unqualified" statusIcon="lock" intensity="faded" />
  </BadgeWorkflow>
);

/**
 * Component view
 */
export const Component: Story<BadgeWorkflowProps> = Template.bind({});
Component.args = {};
