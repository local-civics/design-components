import React from "react";
import { InMemoryApp } from "../../App";
import { Profile } from "./Profile";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Profile",
  component: Profile,
};

/**
 * Profile
 */
export const Page = () => <InMemoryApp location="/residents/andre.carter" />;
