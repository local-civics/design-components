import React                              from "react";
import { AuthLayout, AuthLayoutProps } from "./AuthLayout";
import { Story }                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Layouts/AuthLayout",
  component: AuthLayout,
};

/**
 * Component storybook template
 */
const Template: Story<AuthLayoutProps> = (args) => (
  <AuthLayout {...args}>
    <div className="w-full h-full bg-zinc-100 flex">
        <span className="m-auto w-max h-max font-bold">Content</span>
    </div>
  </AuthLayout>
);

/**
 * Component stories
 */
export const Component: Story<AuthLayoutProps> = Template.bind({});
Component.args = {};
