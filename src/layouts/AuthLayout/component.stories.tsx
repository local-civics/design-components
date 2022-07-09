import React from "react";
import { AuthLayout, AuthLayoutProps } from "./AuthLayout";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Layout/AuthLayout/AuthLayout",
  component: AuthLayout,
};

/**
 * Component storybook template
 */
const Template: Story<AuthLayoutProps> = (args) => <AuthLayout {...args} />;

/**
 * Component stories
 */
export const Component: Story<AuthLayoutProps> = Template.bind({});
Component.args = {};
