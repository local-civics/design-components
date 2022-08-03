import React from "react";
import { Story } from "@storybook/react";
import { BadgeSuccessDialog, BadgeSuccessDialogProps } from "./BadgeSuccessDialog";
import { Overlay } from "../../Overlay";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/BadgeSuccessDialog",
  component: BadgeSuccessDialog,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeSuccessDialogProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Overlay>
      <BadgeSuccessDialog displayName="College Explorer" xp={1000} {...args} />
    </Overlay>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeSuccessDialogProps> = Template.bind({});
Component.args = {};
