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
 * Existing.
 */
export const Andre = () => <InMemoryApp accessToken="andre.carter" location="/tenants/andre.carter" />;

/**
 * New resident.
 */
export const New = () => <InMemoryApp accessToken="resident" location="/tenants/resident" />;
