import React from "react";
import { InMemoryApp } from "../../App";
import { Settings } from "./Settings";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Settings",
  component: Settings,
};

/**
 * Settings
 */
export const Page = () => <InMemoryApp location="/residents/andre.carter/settings" />;
