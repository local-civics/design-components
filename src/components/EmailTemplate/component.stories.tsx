import React from "react";
import { EmailTemplate, EmailTemplateProps } from "./EmailTemplate";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/EmailTemplate",
  component: EmailTemplate,
};

/**
 * Component storybook template
 */
const Template: Story<EmailTemplateProps> = (args) => <EmailTemplate {...args} />;

/**
 * Component stories
 */
export const Component: Story<EmailTemplateProps> = Template.bind({});
Component.args = {};