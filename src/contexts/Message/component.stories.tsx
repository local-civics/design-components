import { MessageProvider, MessageProviderProps } from "./Message";
import { Story } from "@storybook/react";
import {MemoryRouter } from "react-router-dom";

/**
 * Storybook component configuration
 */
export default {
  title: "Contexts/MessageContext",
  component: MessageProvider,
};

/**
 * Component storybook template
 */
const Template: Story<MessageProviderProps> = (args) => {
  return <MemoryRouter><MessageProvider message="This is a message for you" {...args} /></MemoryRouter>;
};

/**
 * Component stories
 */
export const Component: Story<MessageProviderProps> = Template.bind({});
Component.args = {};
