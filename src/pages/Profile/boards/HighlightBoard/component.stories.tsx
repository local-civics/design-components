import { Story } from "@storybook/react";
import { HighlightBoard, HighlightBoardProps } from "./HighlightBoard";

/**
 * Storybook component configuration
 */
export default {
  title: "Profile/HighlightBoard",
  component: HighlightBoard,
};

/**
 * Component storybook template
 */
const Template: Story<HighlightBoardProps> = (args) => <HighlightBoard {...args} />;

/**
 * Component view
 */
export const Component: Story<HighlightBoardProps> = Template.bind({});
Component.args = {};
