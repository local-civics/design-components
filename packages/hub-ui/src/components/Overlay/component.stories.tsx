import React from "react";
import { Story } from "@storybook/react";

import { Overlay, OverlayProps } from "./Overlay";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Overlay",
  component: Overlay,
};

/**
 * Component storybook template
 */
const Template: Story<OverlayProps> = (args) => (
  <div className="relative bg-gray-50 h-screen w-screen">
    <div className="absolute top-0 bottom-0 left-0 right-0">
      <Overlay {...args}>
        <div className="bg-white p-5 w-60 h-24">
          <p className="m-auto"> Overlay Contents </p>
        </div>
      </Overlay>
    </div>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<OverlayProps> = Template.bind({});
Component.args = {};
