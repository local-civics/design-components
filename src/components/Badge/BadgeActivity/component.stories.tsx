import React from "react";
import { Story } from "@storybook/react";

import { Overlay }                               from "../../Overlay";
import { BadgeActivity, BadgeActivityProps } from "./BadgeActivity";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Badge/BadgeActivity",
  component: BadgeActivity,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeActivityProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Overlay>
      <BadgeActivity
          activityName="Scavenger Hunt (CUNY)"
          criteriaName="Workshop"
          xp={300}
          completedAt="2020-12-22T02:53:05.929149Z"
          imageURL="https://cdn.localcivics.io/rc/event/sponsored.jpg"
          tags={["#Leadership", "#Public Speaking"]}
          {...args}
      />
    </Overlay>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeActivityProps> = Template.bind({});
Component.args = {};
