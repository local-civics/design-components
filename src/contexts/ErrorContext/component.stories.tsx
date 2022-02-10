import { ErrorContextProvider, ErrorContextProviderProps } from "./ErrorContext";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Contexts/ErrorContext",
  component: ErrorContextProvider,
};

/**
 * Component storybook template
 */
const Template: Story<ErrorContextProviderProps> = (args) => {
  return <ErrorContextProvider value="An error has occurred." />;
};

/**
 * Component stories
 */
export const Component: Story<ErrorContextProviderProps> = Template.bind({});
Component.args = {};
