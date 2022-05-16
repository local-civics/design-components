import React from "react";
import { LegalAgreement, LegalAgreementProps } from "./LegalAgreement";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Onboarding/LegalAgreement",
  component: LegalAgreement,
};

/**
 * Component storybook template
 */
const Template: Story<LegalAgreementProps> = (args) => (
  <div className="font-proxima w-max m-auto">
    <LegalAgreement {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<LegalAgreementProps> = Template.bind({});
Component.args = {};
