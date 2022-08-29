import React                           from "react";
import { Story }                       from "@storybook/react";
import {Overlay}                       from "../../../../components";
import { FormDialog, FormDialogProps } from "./FormDialog";

/**
 * Storybook component configuration
 */
export default {
    title: "Admin/Form/FormDialog",
    component: FormDialog,
};

/**
 * Component storybook template
 */
const Template: Story<FormDialogProps> = (args) => (
    <div className="w-max font-proxima m-auto">
        <Overlay>
            <FormDialog
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
export const Component: Story<FormDialogProps> = Template.bind({});
Component.args = {};
