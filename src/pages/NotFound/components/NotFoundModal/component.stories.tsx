import { Story } from "@storybook/react";
import React from "react";
import { NotFoundModal, NotFoundModalProps } from "./NotFoundModal";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/NotFound/NotFoundModal",
  component: NotFoundModal,
};

/**
 * Component storybook template
 */
const Template: Story<NotFoundModalProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <NotFoundModal visible {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<NotFoundModalProps> = Template.bind({});
Component.args = {};
