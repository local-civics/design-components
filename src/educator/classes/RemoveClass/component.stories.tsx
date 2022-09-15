import * as React                        from "react";
import { RemoveClass, RemoveClassProps } from "./RemoveClass";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/Classes/RemoveClass",
  component: RemoveClass,
};

/**
 * Component storybook template
 */
const Template: Story<RemoveClassProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <RemoveClass
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<RemoveClassProps> = Template.bind({});
Component.args = {};
