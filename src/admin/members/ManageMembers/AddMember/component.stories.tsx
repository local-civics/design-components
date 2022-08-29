import * as React                    from "react";
import { AddMember, AddMemberProps } from "./AddMember";
import { Story }                     from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageMembers/AddMember",
  component: AddMember,
};

/**
 * Component storybook template
 */
const Template: Story<AddMemberProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <AddMember {...args}/>
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<AddMemberProps> = Template.bind({});
Component.args = {};
