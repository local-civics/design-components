import { Loader, LoaderProps } from ".";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Basics/Loader",
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
export const Default: Story<LoaderProps> = Template.bind({});
Default.args = {};
