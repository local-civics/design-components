import { Story } from "@storybook/react";
import { ResidentWidget, ResidentWidgetProps } from "./ResidentWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/ResidentWidget",
  component: ResidentWidget,
};

/**
 * Component storybook template
 */
const Template: Story<ResidentWidgetProps> = (args) => (
  <ResidentWidget
    tenantName="floyd.miles"
    givenName="floyd"
    familyName="miles"
    avatarURL="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    createdAt={new Date().toString()}
    {...args}
  />
);

/**
 * Component view
 */
export const Component: Story<ResidentWidgetProps> = Template.bind({});
Component.args = {};
