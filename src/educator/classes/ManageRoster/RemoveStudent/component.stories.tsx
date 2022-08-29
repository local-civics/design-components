import * as React                          from "react";
import { RemoveStudent, RemoveStudentProps } from "./RemoveStudent";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/ManageClasses/RemoveStudent",
  component: RemoveStudent,
};

/**
 * Component storybook template
 */
const Template: Story<RemoveStudentProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <RemoveStudent
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<RemoveStudentProps> = Template.bind({});
Component.args = {};
