import React from "react";
import { Story }                      from "@storybook/react";
import { Dialog, DialogProps } from "./Dialog";
import { Overlay }                    from "../../../components";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/Library/Dialog",
  component: Dialog,
};

/**
 * Component storybook template
 */
const Template: Story<DialogProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Overlay>
      <Dialog
          description="An example description."
          {...args}
          title={args.title || "College Explorer"}
          icon={args.icon || "party popper"}
      />
    </Overlay>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<DialogProps> = Template.bind({});
Component.args = {};
