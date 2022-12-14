import * as React                        from "react";
import {Classes, ClassesProps} from "./Classes";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Classes",
  component: Classes,
};

/**
 * Component storybook template
 */
const Template: Story<ClassesProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Classes {...args}/>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<ClassesProps> = Template.bind({});
Component.args = {};
