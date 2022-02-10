import { Message, MessageContextProvider, MessageContextProviderProps } from "./MessageContext";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Contexts/MessageContext",
  component: MessageContextProvider,
};

/**
 * Component storybook template
 */
const Template: Story<MessageContextProviderProps> = (args) => {
  const message: Message = {
    severity: "info",
    icon: "objective",
    title: "A message for you",
    description: "This is a message for you",
  };
  return <MessageContextProvider value={message} />;
};

/**
 * Component stories
 */
export const Component: Story<MessageContextProviderProps> = Template.bind({});
Component.args = {};
