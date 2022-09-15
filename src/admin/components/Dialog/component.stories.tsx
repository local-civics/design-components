import React                           from "react";
import { Story }                       from "@storybook/react";
import {Overlay}                   from "../../../components";
import { Dialog, DialogProps } from "./Dialog";

/**
 * Storybook component configuration
 */
export default {
    title: "Admin/Library/Dialog",
    component: Dialog,
};

/**
 * Component storybook template
 */
const Template: Story<DialogProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <Overlay>
            <Dialog
                title="Success!"
                description="We've successfully received your request. Please allow up to 5 mins for your changes to be finished. "
                {...args}
            />
        </Overlay>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<DialogProps> = Template.bind({});
Component.args = {};
