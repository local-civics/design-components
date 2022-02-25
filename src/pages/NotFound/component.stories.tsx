import React from "react";
import { InMemoryApp } from "../../App";
import { NotFound } from "./NotFound";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/NotFound",
  component: NotFound,
};

/**
 * NotFound
 */
export const Page = () => <InMemoryApp location="/does-not-exist" />;
