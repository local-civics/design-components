import * as React                        from "react";
import { CreateBadge, CreateBadgeProps } from "./CreateBadge";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Badges/CreateBadge",
  component: CreateBadge,
};

/**
 * Component storybook template
 */
const Template: Story<CreateBadgeProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <CreateBadge
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<CreateBadgeProps> = Template.bind({});
Component.args = {};
