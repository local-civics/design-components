import * as React                        from "react";
import { AddStudents, AddStudentsProps } from "./AddStudents";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/ManageRoster/AddStudents",
  component: AddStudents,
};

/**
 * Component storybook template
 */
const Template: Story<AddStudentsProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <AddStudents
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<AddStudentsProps> = Template.bind({});
Component.args = {};
