import * as React                               from "react";
import { CreateClass, CreateClassProps } from "./CreateClass";
import { Story }                                from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/ManageClasses/CreateClass",
  component: CreateClass,
};

/**
 * Component storybook template
 */
const Template: Story<CreateClassProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <CreateClass
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CreateClassProps> = Template.bind({});
Component.args = {};
