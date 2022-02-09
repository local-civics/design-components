import React from "react";
import { EditModal, EditModalProps } from "./EditModal";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Settings/EditModal",
  component: EditModal,
};

/**
 * Component storybook template
 */
const Template: Story<EditModalProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <EditModal
      visible
      residentName="floyd.miles"
      givenName="floyd"
      familyName="miles"
      avatarURL="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      impactStatement="I would like to encourage my community to become more educated on issues that directly affect us, as well as make sure andre.carter community is a place where everyone is welcome."
      accessToken="<jwt-access-token>"
      {...args}
    />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<EditModalProps> = Template.bind({});
Component.args = {};
