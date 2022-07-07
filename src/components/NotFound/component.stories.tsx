import { Story } from "@storybook/react";
import React from "react";
import { NotFound, NotFoundProps } from "./NotFound";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/NotFound",
  component: NotFound,
};

/**
 * Component storybook template
 */
const Template: Story<NotFoundProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <NotFound visible {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<NotFoundProps> = Template.bind({});
Component.args = {};
