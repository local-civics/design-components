import React from "react";
import { Story } from "@storybook/react";
import { ProfileHeroCard, ProfileHeroCardProps } from "./ProfileHeroCard";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/ProfileHeroCard",
  component: ProfileHeroCard,
};

/**
 * Component storybook template
 */
const Template: Story<ProfileHeroCardProps> = (args) => (
  <div style={{ width: 720 }}>
    <ProfileHeroCard {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ProfileHeroCardProps> = Template.bind({});
Component.args = {
  givenName: "Beverly",
  familyName: "Leon",
  createdAt: "2023-01-01",
  online: true,
  impactStatement:
    "I would like to encourage students in my school to take on more leadership roles and create more authentic community experiences.",
  placeName: "Amsterdam, NY",
  communityName: "NVPS AMS I",
  level: 6,
  xp: 1500,
  nextXP: 2500,
  onEdit: () => {},
};
