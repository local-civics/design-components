import React from "react";
import { InMemoryApp } from "../../App";
import { Home } from "./Home";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Home",
  component: Home,
};

/**
 * Home
 */
export const Page = () => <InMemoryApp location="/" />;
