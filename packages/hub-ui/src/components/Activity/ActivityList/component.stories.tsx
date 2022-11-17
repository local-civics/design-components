import { Story } from "@storybook/react";
import React from "react";
import { ActivityList, ActivityListProps } from "./ActivityList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Activity/ActivityList",
  component: ActivityList,
};

/**
 * Existing.
 */
export const Component: Story<ActivityListProps> = (props) => (
  <ActivityList
    {...props}
    activities={[
      {
        headline: "Item #1",
        pathway: "policy & government",
        xp: 250,
        imageURL: "https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp",
      },
      {
        headline: "Item #2",
        pathway: "college & career",
        xp: 250,
        imageURL:
          "https://imageio.forbes.com/specials-images/imageserve/0fyvc753KyfCB/960x960.jpg?fit=bounds&format=jpg&width=960",
      },
      {
        headline: "Item #3",
        pathway: "arts & culture",
        xp: 250,
        imageURL: "https://bestlifeonline.com/wp-content/uploads/sites/3/2019/12/shutterstock_1120210925.jpg",
      },
    ]}
  />
);
