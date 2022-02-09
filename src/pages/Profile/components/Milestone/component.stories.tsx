import { Story } from "@storybook/react";
import { Milestone, MilestoneProps } from "./Milestone";

/**
 * Storybook component configuration
 */
export default {
  title: "Profile/Milestone",
  component: Milestone,
};

/**
 * Component storybook template
 */
const Template: Story<MilestoneProps> = (args) => <Milestone title="A milestone" {...args} />;

/**
 * Component view
 */
export const Component: Story<MilestoneProps> = Template.bind({});
Component.args = {};
