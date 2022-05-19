import { Story } from "@storybook/react";
import { PathwayProgress, PathwayProgressProps } from "./PathwayProgress";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Pathway/PathwayProgress",
  component: PathwayProgress,
};

/**
 * Component storybook template
 */
const Template: Story<PathwayProgressProps> = (args) => <PathwayProgress {...args} />;

/**
 * Component view
 */
export const Component: Story<PathwayProgressProps> = Template.bind({});
Component.args = {};
