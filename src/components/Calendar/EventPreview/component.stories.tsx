import { Story } from "@storybook/react";
import { EventPreview, EventPreviewProps } from "./EventPreview";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Calendar/EventPreview",
  component: EventPreview,
};

/**
 * Component storybook template
 */
const Template: Story<EventPreviewProps> = (args) => <EventPreview headline="EventPreview #1" pathway="policy & government" {...args} />;

/**
 * Component view
 */
export const Component: Story<EventPreviewProps> = Template.bind({});
Component.args = {};
