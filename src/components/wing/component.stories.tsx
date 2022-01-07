import { Wing, WingProps } from ".";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
    title: "Containers/Wing",
    component: Wing,
};

/**
 * Component storybook template
 */
const Template: Story<WingProps> = (args) => <Wing className="border-gray-200 border-2 rounded-md h-48 w-52" {...args}><div/> </Wing>;

/**
 * Component stories
 */
export const Default: Story<WingProps> = Template.bind({});
Default.args = {};