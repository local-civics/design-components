import * as React                                             from "react";
import {ManagedBadge, ManageBadges, ManageBadgesProps} from "./ManageBadges";
import { Story }                                              from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageBadges",
  component: ManageBadges,
};

/**
 * Component storybook template
 */
const Template: Story<ManageBadgesProps> = (args) => {
    const badges: ManagedBadge[] = [{
        displayName: "Badge #1",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        description: "A sample badge description",
        icon: "formal mortarboard",
    },{
        displayName: "Badge #2",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2",
        description: "A sample badge with a really long description that will demonstrate ellipse of text",
        icon: "formal mortarboard",
        level: 1,
    },{
        displayName: "Badge #3",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3",
        icon: "formal mortarboard",
        level: 2,
    },{
        displayName: "Badge #4",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4",
        icon: "formal gavel",
    },{
        displayName: "Badge #5",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL5",
        icon: "formal camera lens",
        description: "Another sample badge with a really long description that will demonstrate ellipse of text",
        hidden: true,
    },{
        displayName: "Badge #6",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL6",
        icon: "formal scholar",
        hidden: true,
    },{
        displayName: "Badge #7",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL7",
        icon: "formal stopwatch",
    },{
        displayName: "Badge #8",
        badgeId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL8",
        icon: "formal ballot box",
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageBadges
          badges={badges}
          {...args}
          loading={null}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageBadgesProps> = Template.bind({});
Component.args = {};
