import * as React                        from "react";
import { Story }                                  from "@storybook/react";
import {CardGradient, CardGradientProps} from "./CardGradient";

/**
 * Storybook component configuration
 */
export default {
  title: "Cards/CardGradient",
  component: CardGradient,
};

/**
 * Component storybook template
 */
const Template: Story<CardGradientProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <CardGradient {...args} title={args.title||"Classes"} description={args.description||"Manage your classes and rostering"}/>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<CardGradientProps> = Template.bind({});
Component.args = {};
