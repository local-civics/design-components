import { Story } from "@storybook/react";
import { Material } from "../../../components/Material/Material";
import { MaterialWorkflow, MaterialWorkflowProps } from "./MaterialWorkflow";

/**
 * Storybook component configuration
 */
export default {
  title: "Workflows/MaterialWorkflow",
  component: MaterialWorkflow,
};

/**
 * Component storybook template
 */
const Template: Story<MaterialWorkflowProps> = (args) => (
  <MaterialWorkflow {...args}>
    <Material title="material #1" icon="arts & culture" />
    <Material title="material #2" icon="policy & government" />
    <Material title="material #3" icon="recreation" />
    <Material title="material #4" icon="college & career" />
    <Material title="material #5" icon="volunteer" />
    <Material title="material #6" icon="sponsored" />
  </MaterialWorkflow>
);

/**
 * Component view
 */
export const Component: Story<MaterialWorkflowProps> = Template.bind({});
Component.args = {};
