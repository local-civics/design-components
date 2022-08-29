import * as React                                                           from "react";
import {ManagedActivity, ManageActivities, ManageActivitiesProps} from "./ManageActivities";
import { Story }                                                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageActivities",
  component: ManageActivities,
};

/**
 * Component storybook template
 */
const Template: Story<ManageActivitiesProps> = (args) => {
    const activities: ManagedActivity[] = [{
        displayName: "Activity #1",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        description: "A sample activity description",
        imageURL: "https://media.istockphoto.com/photos/abstract-wavy-object-picture-id1198271727?b=1&k=20&m=1198271727&s=170667a&w=0&h=b626WM5c-lq9g_yGyD0vgufb4LQRX9UgYNWPaNUVses=",
    },{
        displayName: "Activity #2",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2",
        description: "A sample activity with a really long description that will demonstrate ellipse of text",
        imageURL: "https://w0.peakpx.com/wallpaper/203/1010/HD-wallpaper-forest-flora-forest-vithurshan-dark-europe-faded-green-leaf-mood-moody-sri-lanka-vithurshan-jpeg-wood.jpg",
    },{
        displayName: "Activity #3",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3",
        imageURL: "https://wallpaperaccess.com/full/477393.jpg",
    },{
        displayName: "Activity #4",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4",
        imageURL: "https://images.unsplash.com/photo-1542351567-cd7b06dc08d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
    },{
        displayName: "Activity #5",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL5",
        imageURL: "https://media.istockphoto.com/videos/abstract-polygon-grid-wireframe-as-swirl-glowing-waves-4k-uhd-3d-video-id1287841422?b=1&k=20&m=1287841422&s=640x640&h=JWfuCfTx2FkEAJn0_XSvemsaMeae6yBDPnk9JZ07Wfs=",
        description: "Another sample activity with a really long description that will demonstrate ellipse of text",
        hidden: true,
    },{
        displayName: "Activity #6",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL6",
        imageURL: "https://images.unsplash.com/photo-1487612168647-e8e42c3d33d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW90aW9ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        hidden: true,
    },{
        displayName: "Activity #7",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL7",
        imageURL: "https://wallpapercave.com/wp/wp3317115.png",
    },{
        displayName: "Activity #8",
        activityId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL8",
        imageURL: "https://wallpaperaccess.com/full/1990308.jpg",
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageActivities
          activities={activities}
          {...args}
          loading={null}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageActivitiesProps> = Template.bind({});
Component.args = {};
