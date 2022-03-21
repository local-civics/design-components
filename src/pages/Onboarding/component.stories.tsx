import React from "react";
import { InMemoryApp } from "../../App";
import { Onboarding } from "./Onboarding";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Onboarding",
  component: Onboarding,
};

/**
 * Onboarding
 */
export const Page = () => <InMemoryApp accessToken="resident" location="/onboarding" />;
