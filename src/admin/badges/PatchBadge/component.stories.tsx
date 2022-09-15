import * as React                                   from "react";
import {PatchBadge, PatchBadgeProps, Badge} from "./PatchBadge";
import { Story }                                    from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Badges/PatchBadge",
  component: PatchBadge,
};

/**
 * Component storybook template
 */
const Template: Story<PatchBadgeProps> = (args) => {
    const badge: Badge = {
        displayName: "Badge #1",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        projectId:  "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        description: "A sample badge description",
        icon: "formal scholar",
    }

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <PatchBadge
          badge={badge}
          {...args}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<PatchBadgeProps> = Template.bind({});
Component.args = {};
