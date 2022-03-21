import React from "react";
import { InMemoryApp } from "../../App";
import { Badge } from "./Badge";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Badge",
  component: Badge,
};

/**
 * Badge
 */
export const Page = () => (
  <InMemoryApp accessToken="andre.carter" location="/tenants/andre.carter/badges/onboarding.badge" />
);
