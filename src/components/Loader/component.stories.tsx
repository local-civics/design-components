import { Loader, LoaderProps } from "./Loader";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Loader",
  component: Loader,
  argTypes: {
    isLoading: {
      defaultValue: true,
    },
  },
};

/**
 * Component storybook template
 */
const Template: Story<LoaderProps> = (args) => <Loader {...args}>💰</Loader>;

/**
 * Component stories
 */
export const Component: Story<LoaderProps> = Template.bind({});
Component.args = {};
