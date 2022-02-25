import { Story } from "@storybook/react";
import React from "react";
import { Experience } from "../Experience/Experience";
import { Exhibition } from "../Exhibition/Exhibition";
import { Gallery, GalleryProps } from "./Gallery";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Explore/Gallery",
  component: Gallery,
};

/**
 * Existing.
 */
export const Component: Story<GalleryProps> = (props) => (
  <Gallery
    {...props}
    primary={
      <Experience
        displayName="Event #1"
        pathway="policy & government"
        quantity={250}
        imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
      />
    }
    top={
      <Exhibition>
        <Experience
          displayName="Event #1"
          pathway="policy & government"
          quantity={250}
          imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
        />
        <Experience
          displayName="Event #2"
          pathway="college & career"
          quantity={250}
          imageURL="https://imageio.forbes.com/specials-images/imageserve/0fyvc753KyfCB/960x960.jpg?fit=bounds&format=jpg&width=960"
        />
        <Experience
          displayName="Event #3"
          pathway="arts & culture"
          quantity={250}
          imageURL="https://bestlifeonline.com/wp-content/uploads/sites/3/2019/12/shutterstock_1120210925.jpg"
        />
      </Exhibition>
    }
    soonest={
      <Exhibition>
        <Experience
          displayName="Event #1"
          pathway="policy & government"
          quantity={250}
          imageURL="https://i.insider.com/592f4169b74af41b008b5977?width=1300&format=jpeg&auto=webp"
        />
        <Experience
          displayName="Event #2"
          pathway="college & career"
          quantity={250}
          imageURL="https://imageio.forbes.com/specials-images/imageserve/0fyvc753KyfCB/960x960.jpg?fit=bounds&format=jpg&width=960"
        />
        <Experience
          displayName="Event #3"
          pathway="arts & culture"
          quantity={250}
          imageURL="https://bestlifeonline.com/wp-content/uploads/sites/3/2019/12/shutterstock_1120210925.jpg"
        />
      </Exhibition>
    }
  />
);
