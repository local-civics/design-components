import React from "react";
import { HomeLayout, HomeLayoutProps } from "./HomeLayout";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Layout/HomeLayout/HomeLayout",
  component: HomeLayout,
};

/**
 * Component storybook template
 */
const Template: Story<HomeLayoutProps> = (args) => (
  <HomeLayout {...args}>
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </HomeLayout>
);

/**
 * Component stories
 */
export const Component: Story<HomeLayoutProps> = Template.bind({});
Component.args = {};
