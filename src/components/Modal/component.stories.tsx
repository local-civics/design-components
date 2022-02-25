import React from "react";
import { Modal, ModalProps } from "./Modal";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Modal",
  component: Modal,
};

/**
 * Component storybook template
 */
const Template: Story<ModalProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <div>
      <Modal visible {...args}>
        <div className="w-60 h-24">
          <p className="m-auto"> Modal Contents </p>
        </div>
      </Modal>
    </div>
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ModalProps> = Template.bind({});
Component.args = {};
