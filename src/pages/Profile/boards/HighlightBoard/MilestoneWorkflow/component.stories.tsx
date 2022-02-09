import { Story } from "@storybook/react";
import { Milestone } from "../../../components/Milestone/Milestone";
import { MilestoneWorkflow, MilestoneWorkflowProps } from "./MilestoneWorkflow";

/**
 * Storybook component configuration
 */
export default {
  title: "Profile/HighlightBoard/MilestoneWorkflow",
  component: MilestoneWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<MilestoneWorkflowProps> = (args) => (
  <MilestoneWorkflow {...args}>
    <Milestone title="milestone #1" icon="arts & culture" />
    <Milestone title="milestone #2" icon="policy & government" />
    <Milestone title="milestone #3" icon="recreation" />
    <Milestone title="milestone #4" icon="college & career" />
    <Milestone title="milestone #5" icon="volunteer" />
    <Milestone title="milestone #6" icon="sponsored" />
  </MilestoneWorkflow>
);

/**
 * Component view
 */
export const Component: Story<MilestoneWorkflowProps> = Template.bind({});
Component.args = {};
