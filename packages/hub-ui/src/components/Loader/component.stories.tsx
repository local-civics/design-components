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

/**
 * Bigger, higher-contrast spinner with contextual text, matching the treatment given to
 * slow-loading pages (educator File Locker / Dashboard).
 */
export const WithLabel: Story<LoaderProps> = Template.bind({});
WithLabel.args = {
  size: 56,
  strokeClassName: "stroke-dark-blue-400",
  label: "Hold on, we're loading your dashboard.",
};
