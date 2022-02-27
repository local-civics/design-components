import React from "react";
import { InMemoryApp } from "../../App";
import { Explore } from "./Explore";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Explore",
  component: Explore,
};

/**
 * Explore
 */
export const Page = () => <InMemoryApp accessToken="andre.carter" location="/communities/hcz/explore" />;
