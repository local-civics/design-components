import { Story } from "@storybook/react";
import React from "react";
import { ActivityPreview } from "../ActivityPreview/ActivityPreview";
import { Gallery, GalleryProps } from "./Gallery";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Activity/Gallery",
  component: Gallery,
};

/**
 * Existing.
 */
export const Component: Story<GalleryProps> = (props) => (
  <Gallery
    {...props}
    primary={
      <ActivityPreview
        headline="EventPreview #1"
        pathway="policy & government"
        xp={250}
        imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
      />
    }
    top={
      <article className="grid grid-cols-1 md:flex gap-2 overflow-scroll">
        <ActivityPreview
          headline="EventPreview #1"
          pathway="policy & government"
          xp={250}
          imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
        />
        <ActivityPreview
          headline="EventPreview #2"
          pathway="college & career"
          xp={250}
          imageURL="https://imageio.forbes.com/specials-images/imageserve/0fyvc753KyfCB/960x960.jpg?fit=bounds&format=jpg&width=960"
        />
        <ActivityPreview
          headline="EventPreview #3"
          pathway="arts & culture"
          xp={250}
          imageURL="https://bestlifeonline.com/wp-content/uploads/sites/3/2019/12/shutterstock_1120210925.jpg"
        />
      </article>
    }
    soonest={
      <article className="grid grid-cols-1 md:flex gap-2 overflow-scroll">
        <ActivityPreview
          headline="EventPreview #1"
          pathway="policy & government"
          xp={250}
          imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
        />
        <ActivityPreview
          headline="EventPreview #2"
          pathway="college & career"
          xp={250}
          imageURL="https://imageio.forbes.com/specials-images/imageserve/0fyvc753KyfCB/960x960.jpg?fit=bounds&format=jpg&width=960"
        />
        <ActivityPreview
          headline="EventPreview #3"
          pathway="arts & culture"
          xp={250}
          imageURL="https://bestlifeonline.com/wp-content/uploads/sites/3/2019/12/shutterstock_1120210925.jpg"
        />
      </article>
    }
  />
);
