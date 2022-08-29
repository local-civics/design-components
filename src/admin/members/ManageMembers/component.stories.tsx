import * as React                                         from "react";
import {ManagedMember, ManageMembers, ManageMembersProps} from "./ManageMembers";
import { Story }                                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageMembers",
  component: ManageMembers,
};

/**
 * Component storybook template
 */
const Template: Story<ManageMembersProps> = (args) => {
    const members: ManagedMember[] = [{
        memberId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        displayName: "Member #1",
        email: "member1@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        role: "Member",
        lastActivity: "2022-01-01"
    },{
        memberId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2",
        displayName: "Member #2",
        email: "member2@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        role: "Workspace admin",
        lastActivity: "2022-01-01"
    },{
        memberId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3",
        displayName: "Member #3",
        email: "member3@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        role: "Educator",
        lastActivity: "2022-01-01"
    },{
        memberId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4",
        displayName: "Member #4",
        email: "member4@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageMembers
          members={members}
          {...args}
          loading={null}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageMembersProps> = Template.bind({});
Component.args = {};
