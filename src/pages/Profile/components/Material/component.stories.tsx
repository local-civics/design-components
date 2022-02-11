import { Story } from "@storybook/react";
import { Material, MaterialProps } from "./Material";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Material",
  component: Material,
};

/**
 * Component storybook template
 */
const Template: Story<MaterialProps> = (args) => <Material title="Learning material #1" {...args} />;

/**
 * Component view
 */
export const Component: Story<MaterialProps> = Template.bind({});
Component.args = {};
