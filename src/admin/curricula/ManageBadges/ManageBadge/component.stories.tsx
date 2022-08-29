import * as React                                          from "react";
import {ManageBadge, ManageBadgeProps, ManagedBadge} from "./ManageBadge";
import { Story }                                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageBadges/ManageBadge",
  component: ManageBadge,
};

/**
 * Component storybook template
 */
const Template: Story<ManageBadgeProps> = (args) => {
    const badge: ManagedBadge = {
        displayName: "Badge #1",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        projectId:  "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        description: "A sample badge description",
        icon: "formal scholar",
    }

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageBadge
          badge={badge}
          {...args}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageBadgeProps> = Template.bind({});
Component.args = {};
