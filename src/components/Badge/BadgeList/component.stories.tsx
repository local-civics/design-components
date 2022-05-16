import { Story } from "@storybook/react";
import { BadgePreview } from "../BadgePreview/BadgePreview";
import { BadgeList, BadgePreviewProps } from "./BadgeList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/BadgeList",
  component: BadgeList,
};

/**
 * Component storybook template
 */
const Template: Story<BadgePreviewProps> = (args) => (
  <BadgeList {...args}>
    <BadgePreview headline="onboarding badge" imageURL="https://cdn.localcivics.io/badges/onboarding.png" />
    <BadgePreview headline="badge #2" />
    <BadgePreview headline="badge #3" />
  </BadgeList>
);

/**
 * Component view
 */
export const Component: Story<BadgePreviewProps> = Template.bind({});
Component.args = {};
