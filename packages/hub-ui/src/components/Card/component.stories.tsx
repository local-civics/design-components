import React from "react";
import { Story } from "@storybook/react";

import { Card, CardProps } from "./Card";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Card",
  component: Card,
};

/**
 * Component storybook template
 */
const Template: Story<CardProps> = (args) => (
  <div className="relative bg-gray-50 h-screen w-screen">
    <div className="absolute top-0 bottom-0 left-0 right-0">
      <Card {...args}>
        <div className="w-60 h-24">
          <p className="m-auto"> Card Contents </p>
        </div>
      </Card>
    </div>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CardProps> = Template.bind({});
Component.args = {};
