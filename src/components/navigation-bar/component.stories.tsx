import { NavigationBar, NavigationBarProps } from ".";
import { Story }                             from "@storybook/react";
import {Icon}                                from "../icon";

/**
 * Storybook component configuration
 */
export default {
    title: "Basics/NavigationBar",
    component: NavigationBar,
};

/**
 * Component storybook template
 */
const Template: Story<NavigationBarProps> = (args) => <NavigationBar {...args} />;

/**
 * Component stories
 */
export const Default: Story<NavigationBarProps> = Template.bind({});
Default.args = {};
