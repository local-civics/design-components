import { MessageProvider, MessageProviderProps } from "./Message";
import { Story } from "@storybook/react";

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
  return <MessageProvider message="This is a message for you" {...args} />;
};

/**
 * Component stories
 */
export const Component: Story<MessageProviderProps> = Template.bind({});
Component.args = {};
