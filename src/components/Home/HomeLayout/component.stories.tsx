import * as React                           from "react";
import { HomeLayout, HomeLayoutProps } from "./HomeLayout";
import { Story }                       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Layouts/HomeLayout",
  component: HomeLayout,
};

/**
 * Component storybook template
 */
const Template: Story<HomeLayoutProps> = (args) => (
  <HomeLayout {...args}>
      <div className="w-full h-full bg-zinc-100 flex">
          <span className="m-auto w-max h-max font-bold">Content</span>
      </div>
  </HomeLayout>
);

/**
 * Component stories
 */
export const Component: Story<HomeLayoutProps> = Template.bind({});
Component.args = {};
