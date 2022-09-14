import * as React                                             from "react";
import {ManageActivity, ManageActivityProps, ManagedActivity} from "./ManageActivity";
import { Story }                                              from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Activity/ManageActivity",
  component: ManageActivity,
};

/**
 * Component storybook template
 */
const Template: Story<ManageActivityProps> = (args) => {
    const activity: ManagedActivity = {
        displayName: "Activity #1",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        projectId:  "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        description: "A sample activity description",
        imageURL: "https://media.istockphoto.com/photos/abstract-wavy-object-picture-id1198271727?b=1&k=20&m=1198271727&s=170667a&w=0&h=b626WM5c-lq9g_yGyD0vgufb4LQRX9UgYNWPaNUVses=",
    }

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageActivity
          activity={activity}
          {...args}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageActivityProps> = Template.bind({});
Component.args = {};
