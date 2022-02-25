import { Story } from "@storybook/react";
import { AboutWidget, AboutWidgetProps } from "./AboutWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/AboutWidget",
  component: AboutWidget,
};

/**
 * Component storybook template
 */
const Template: Story<AboutWidgetProps> = (args) => (
  <AboutWidget
    impactStatement="I would like to encourage my community to become more educated on issues that directly affect us, as well as make sure andre.carter community is a place where everyone is welcome."
    placeName="Harlem, NY"
    communityName="Harlem Children Zone"
    {...args}
  />
);

/**
 * Component view
 */
export const Component: Story<AboutWidgetProps> = Template.bind({});
Component.args = {};
