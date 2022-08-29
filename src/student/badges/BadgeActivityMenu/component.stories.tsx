import React from "react";
import { Story } from "@storybook/react";

import { Overlay }                                   from "../../../components/Overlay";
import { BadgeActivityMenu, BadgeActivityMenuProps } from "./BadgeActivityMenu";

/**
 * Storybook component configuration
 */
export default {
  title: "Student/Badges/BadgeActivityMenu",
  component: BadgeActivityMenu,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeActivityMenuProps> = (args) => (
  <div className="w-full font-proxima m-auto">
    <BadgeActivityMenu
      criteria={[
        {
          displayName: "Live Resume Workshops",
          options: [
            {
              activityName: "Civic Skills: Community Engagement Strategies",
              xp: 500,
              startTime: "2022-06-05T02:53:05.929149Z",
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              startTime: "2022-06-05T02:53:05.929149Z",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
              isSelected: true,
            },
            {
              activityName: "Resume Workshop",
              startTime: "2022-06-05T02:53:05.929149Z",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              startTime: "2022-06-05T02:53:05.929149Z",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
          ],
        },
        {
          displayName: "Guest Speaker Events",
          options: [
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              startTime: "2022-06-05T02:53:05.929149Z",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              startTime: "2022-06-05T02:53:05.929149Z",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
              isSelected: true,
            },
          ],
        },
        {
          displayName: "Scavenger Hunt Events",
          options: [
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
            },
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
              isSelected: true,
            },
          ],
        },
        {
          displayName: "Independent Activities",
          options: [
            {
              activityName: "Resume Workshop",
              xp: 500,
              imageURL: "https://cdn.localcivics.io/rc/event/sponsored.jpg",
              tags: ["#Leadership", "#Public Speaking"],
              isSelected: true,
            },
          ],
        },
      ]}
      {...args}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeActivityMenuProps> = Template.bind({});
Component.args = {};
